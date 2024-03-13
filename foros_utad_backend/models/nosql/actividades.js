const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const ActividadesScheme = new mongoose.Schema(
    {
        idCreador: {
            type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'users' }]
        },
        asunto: {
            type: String
        },
        objetivo: {
            type: String
        },
        tipoActividad: {
            type: ["coordinacion", "alumnos", "privado"]
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
        asistentesRequeridos: {
            type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'users' }]
        },
        espacio: {
            tipo: {
                type: String,
                enum: ['fisico', 'virtual'], // Acepta solo los valores 'fisico' o 'virtual'
                required: true
            },
            edificio: {
                type: String,
                enum: ['madrid', 'berlin', 'londres'],
                required: function () {
                    return this.espacio.tipo === 'fisico'; // Requerido si el tipo de espacio es 'fisico'
                }
            },
            numAula: {
                type: String,
                required: function () {
                    return this.espacio.tipo === 'fisico'; // Requerido si el tipo de espacio es 'fisico'
                }
            }
        },
        fecha: {
            type: Date
        },
        hora: {
            type: Date
        }
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