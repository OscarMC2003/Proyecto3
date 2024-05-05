const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const foroScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        descripcion: {
            type: String
        },
        mensaje: [{
            idUsuario: {
                type: mongoose.Schema.Types.ObjectId, ref: 'users'
            },
            titulo: {
                type: String
            },
            texto: {
                type: String
            },
            etiquetas: [{
                type: String
            }]
        }]
    },
    {
        timestamp: true,
        versionKey: false
    }
)

foroScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("foro", foroScheme)