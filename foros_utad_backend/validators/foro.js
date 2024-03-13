const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateItem = [
    check("name").exists().notEmpty(), //.isLength(min:5, max:90)
    check("descripcion").exists().notEmpty(),
    check("mensaje").exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next) //captura peticion, coge la respuesta y la manda al siguiente
]

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreateItem, validatorGetItem }