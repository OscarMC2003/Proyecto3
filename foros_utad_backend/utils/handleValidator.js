const { validationResult } = require("express-validator")

const validateResults = (req, res, next) => {
    try { //si se cumple
        validationResult(req).throw()
        return next() //se lo envia al siguiente
    } catch (err) { //si no
        res.status(403)
        res.send({ errors: err.array() }) //devuelve error
    }
}

module.exports = validateResults