const express = require("express")
const router = express.Router()

const { getItems, getItem, createItem, updateItem, createMessage, obtainMessage, deleteItem} = require("../controllers/foro")
const { validatorCreateItem, validatorGetItem } = require("../validators/foro")
const authMiddleware = require("../middleware/session")

// RUTA PARA OBTENER TODOS LOS FOROS
router.get("/", authMiddleware, getItems)

// RUTA PARA BUSCAR POR ID
router.get("/:id", authMiddleware, validatorGetItem, getItem)

// RUTA PARA OBTENER TODOS LOS MENSAJES
router.get("/:id/mensajes", authMiddleware, obtainMessage)

// RUTA PARA CREAR FORO
router.post("/", authMiddleware, validatorCreateItem, createItem)

// RUTA PARA CREAR MENSAJES
router.post("/:id/mensaje", authMiddleware, validatorGetItem, createMessage)

// RUTA PARA ACTUALIZAR DATOS DE UN FORO
router.patch("/:id", authMiddleware, validatorGetItem, validatorCreateItem, updateItem)

// RUTA PARA ELIMINAR UN FORO ESPECÍFICO
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem)

module.exports = router