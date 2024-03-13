const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorRegister = [
    check("name").exists().notEmpty().isLength( {min:3, max: 99} ),
    check("age").exists().notEmpty().isNumeric(), //Puedes aplicarle un min y max también al número
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength( {min:8, max: 16} ),
    //check("role").optional(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorLogin = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength( {min:8, max: 16} ),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorRegister, validatorLogin }