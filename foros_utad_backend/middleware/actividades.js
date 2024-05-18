const { actividadesModel, usersModel } = require("../models")
const { handleHttpError } = require('../utils/handleError')
async function checkUserAlreadyJoined(req, res, next) {
    try {
        const { id } = req.params;
        const { userData } = req.body; // userData contiene toda la información del usuario


        if (!userData || !userData._id) {
            return res.status(400).json({ message: 'Información del usuario inválida' });
        }

        // Extraer el _id del userData
        const userId = userData._id;

        // Buscar la actividad por su ID
        const actividad = await actividadesModel.findById(id);
        console.log('actividad:', actividad);

        if (!actividad) {
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }

        //verifica si ya se habia unido a la actividad
        if (actividad.asistentesOpcionales?.some(asistente => asistente.userId.toString() === userId)) {
            // El usuario ya se ha unido a la actividad
            return res.status(400).json({ message: 'El usuario ya se ha unido a esta actividad' });
        }
        

        console.log('agregando usuario a la actividad');
        // Si el usuario no se ha unido a la actividad, continuar con la siguiente middleware
        next();
    } catch (error) {
        console.error('Error al verificar si el usuario se ha unido a la actividad:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}


const addActivityUserMiddleware = async (req, res, next) => {
    try {
        const { id } = req.params; // ID de la actividad
        const { userData } = req.body; // ID del usuario desde la autenticación
        userId = userData._id
        await usersModel.findOneAndUpdate(
            { _id: userId },
            { $push: { actividades: id } },
            { new: true }
        );

        next();
    } catch (err) {
        console.error('Error al agregar la actividad al perfil del usuario:', err);
        return res.status(500).json({ message: 'Error al agregar la actividad al usuario' });
    }
};


module.exports = { checkUserAlreadyJoined, addActivityUserMiddleware };
