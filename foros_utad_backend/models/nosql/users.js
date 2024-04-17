const mongoose = require("mongoose")
const UserScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        activo: {
            type: Boolean
        },
        password:{
            type: String // TODO Guardaremos el hash
        },
        role: {
            type: ["coordinador", "representanteDeAlumnos", "delegado", "tutor", "profesor", "alumno"], // es el enum de SQL
            default: "alumno"
        },
        foros: [{
            id: {
                type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'foro' }]
            }
        }],
        actividades: [{
            id: {
                type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'actividades' }]
            }
        }]     
    },
    {
        timestamp: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)
module.exports = mongoose.model("users", UserScheme) // “users” es el nombre de la colección en mongoDB (o de la tabla en SQL)