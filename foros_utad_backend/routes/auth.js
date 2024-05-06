const express = require("express")
const router = express.Router()

const { loginCtrl, registerCtrl } = require("../controllers/auth")
const { validatorLogin, validatorRegister } = require("../validators/auth")

// RUTA PARA INICIAR SESIÓN
router.post("/", validatorLogin, loginCtrl)
// RUTA PARA REGISTRAR USUARIO
router.post("/register", validatorRegister, registerCtrl)

module.exports = router