const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const StorageScheme = new mongoose.Schema(
    {
        filename: {
            type: String
        },
        data: {
            type: String
        }
    },
    {
        timestamp: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)
ClasesScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("clases", ClasesScheme) // Nombre de la colección (o de la tabla en SQL)
