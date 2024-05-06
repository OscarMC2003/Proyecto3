const express = require("express")
const router = express.Router()

// FUNCIONES CONTROLLER USERS
const { getItems, getItem, createItem, login, updateItem } = require("../controllers/users")
const { validatorCreateItem } = require("../validators/users")
const authMiddleware = require("../middleware/session")

// RUTA PARA OBTENER TODOS LOS USUARIOS
router.get("/", authMiddleware, getItems)

// RUTA PARA OBTENER USUARIOS POR ID
router.get("/:id", authMiddleware, getItem)

// RUTA PARA CREAR USUARIO
router.post("/", authMiddleware, validatorCreateItem, createItem)

router.put("/cambios/:id", updateItem)


module.exports = router