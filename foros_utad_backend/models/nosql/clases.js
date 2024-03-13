const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const ClasesScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        grupo: {
            type: String
        },
        grado: {
            type: String
        },
        curso: {
            type: String
        },
        tipoTitulacion: {
            type: ["grado", "ciclo", "post-grado"]
        },
        aula: {
            edificio: {
                type: ["madrid", "berlin", "londres"],
                default: "madrid"
            },
            numAula: {
                type: String
            }
        }
    },
    {
        timestamp: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)

ClasesScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("clases", ClasesScheme) // Nombre de la colección (o de la tabla en SQL)