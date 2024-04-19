const express = require("express")
const router = express.Router()

const { loginCtrl, registerCtrl } = require("../controllers/auth") // SI VAMOS AÑADIENDO FUNCIONES, LAS PONEMOS AQUI EN LOS CORCHETES
const { validatorLogin, validatorRegister } = require("../validators/auth")
// const authMiddleware = require("../middleware/session")


// RUTA PARA INICIAR SESION
router.post("/", validatorLogin, loginCtrl)
router.post("/register", validatorRegister, registerCtrl)

module.exports = router