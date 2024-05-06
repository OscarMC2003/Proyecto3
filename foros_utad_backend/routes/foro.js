const express = require("express")
const router = express.Router()

const { getItems, getItem, createItem, createMessage, obtainMessage} = require("../controllers/foro")
const { validatorCreateItem, validatorCreateMensaje } = require("../validators/foro")
const authMiddleware = require("../middleware/session")

// RUTA PARA OBTENER TODOS LOS FOROS
router.get("/", authMiddleware, getItems)

// RUTA PARA BUSCAR POR ID
router.get("/:id", authMiddleware, getItem)

// RUTA PARA OBTENER TODOS LOS MENSAJES
router.get("/:id/mensajes", authMiddleware, obtainMessage)

// RUTA PARA CREAR FORO
router.post("/", authMiddleware, validatorCreateItem, createItem)

// RUTA PARA CREAR MENSAJES
router.post("/:id/mensaje", authMiddleware, validatorCreateMensaje, createMessage)

module.exports = router