const express = require("express")
const router = express.Router()

// FUNCIONES CONTROLLER USERS
const { getItems, getItem, createItem, login, updateItem } = require("../controllers/users")
const { validatorCreateItem } = require("../validators/users")
const { validatorRegister } = require("../validators/auth")
const authMiddleware = require("../middleware/session")

// RUTA PARA OBTENER TODOS LOS USUARIOS
router.get("/", authMiddleware, getItems)

// RUTA PARA OBTENER USUARIOS POR ID
router.get("/:id", authMiddleware, getItem)

// RUTA PARA CREAR USUARIO
router.post("/", authMiddleware, validatorCreateItem, createItem)

// RUTA PARA MODIFICAR DATOS DE LOS USUARIOS
router.put("/:id", authMiddleware, updateItem)

module.exports = router