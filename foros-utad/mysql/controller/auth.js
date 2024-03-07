const { db, dbConnect } = require('../db');


const loginController = async (req, res) => {
    try {
        await dbConnect(); // Asegúrate de que esta función maneje la lógica de conexión correctamente
        const { email, password } = req.body;
        
        const query = "SELECT * FROM usuarios WHERE email = ? AND clave = ?"; 
        
        const result = await db.query(query, [email, password]);

        if (result.length > 0) {
            res.status(200).json({ message: "Inicio de sesión exitoso" });
        } else {
            res.status(401).json({ message: "Credenciales inválidas" });
        }
    } catch (error) {
        console.error("Error al verificar las credenciales en la base de datos:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = {
    loginController,
};
