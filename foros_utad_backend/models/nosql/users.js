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
        password: {
            type: String
        },
        role: {
            type: ["coordinador", "representanteDeAlumnos", "delegado", "tutor", "profesor", "alumno"],
            default: "alumno"
        },
        foros: [{
            type: String
        }],
        actividades: [{
            type: String
        }]
    },
    {
        timestamp: true,
        versionKey: false
    }
)
module.exports = mongoose.model("users", UserScheme)