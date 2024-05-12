const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const asistenteSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    value: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});

const asistentesOpcionalesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String
    },

});

const ActividadesScheme = new mongoose.Schema(
    {
        idCreador: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
        },
        asunto: {
            type: String
        },
        objetivo: {
            type: String
        },
        tipoActividad: {
            type: String
        },
        ambitoTitulacion: {
            titulacion: {
                type: String
            },
            curso: {
                type: String
            },
            grupo: {
                type: String
            }
        },
        documentoDescriptivo: {
            // TODO
            type: String
        },
        asistentesRequeridos:
            [asistenteSchema],
        asistentesOpcionales:
            [asistentesOpcionalesSchema],
        espacio: {
            tipo: {
                type: String,
                required: true
            },
            edificio: String,
            numAula: String  // Asegúrate de manejar la opcionalidad adecuadamente
        },
        fecha: {
            type: Date
        },
        hora: {
            type: String,
            required: true
        },
    },
    {
        timestamp: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)

ActividadesScheme.plugin(mongooseDelete, { overrideMethods: "all" })
module.exports = mongoose.model("actividades", ActividadesScheme) // Nombre de la colección (o de la tabla en SQL)

// THIS WAY YOU CAND DO THIS QUERY
//var user = schemas.user;
// const requiredUsers = user.find().populate('asistentesRequeridos')
