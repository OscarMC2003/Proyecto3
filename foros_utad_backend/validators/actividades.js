const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateItem = [
    check("idCreador").exists().notEmpty(), //.isLength(min:5, max:90)
    check("asunto").exists().notEmpty(),
    check("objetivo").exists().notEmpty(),
    check("ambitoTitulacion").exists().notEmpty(),
    check("tipoActividad").exists().notEmpty(),
    check("documentoDescriptivo").exists().notEmpty(),
    check("asistentesRequeridos").exists().notEmpty(),
    check("espacio").exists().notEmpty(),
    check("fecha").notEmpty(),
    check("hora").notEmpty(),
    (req, res, next) => validateResults(req, res, next) //captura peticion, coge la respuesta y la manda al siguiente
]

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorAddActivity = [
    check("_id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreateItem, validatorGetItem, validatorAddActivity }