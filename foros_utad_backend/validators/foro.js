const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateItem = [
    check("name").exists().notEmpty(),
    check("descripcion").exists().notEmpty(),
    check("mensaje").exists().notEmpty().optional(),
    (req, res, next) => validateResults(req, res, next)
]

const validatorCreateMensaje = [
    check("idUsuario").exists().notEmpty(),
    check("titulo").exists().notEmpty(),
    check("texto").exists().notEmpty(),
    check("etiquetas").optional(),
    (req, res, next) => validateResults(req, res, next)
]

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreateItem, validatorCreateMensaje, validatorGetItem }