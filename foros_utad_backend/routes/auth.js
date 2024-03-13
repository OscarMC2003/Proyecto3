const express = require("express")
const router = express.Router()

const { loginCtrl } = require("../controllers/auth") // SI VAMOS AÑADIENDO FUNCIONES, LAS PONEMOS AQUI EN LOS CORCHETES
const { validatorLogin } = require("../validators/auth")


// RUTA PARA INICIAR SESION
router.post("/", validatorLogin, loginCtrl)

module.exports = router