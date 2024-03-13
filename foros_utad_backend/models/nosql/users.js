const mongoose = require("mongoose")
const UserScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String
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
        }
    },
    {
        timestamp: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)
module.exports = mongoose.model("users", UserScheme) // “users” es el nombre de la colección en mongoDB (o de la tabla en SQL)