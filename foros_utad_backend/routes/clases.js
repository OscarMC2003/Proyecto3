const express = require("express")
const router = express.Router()

const { getItems, getItem, createItem } = require("../controllers/clases")
const { validatorCreateItem } = require("../validators/clases")
const authMiddleware = require("../middleware/session")

// RUTA PARA OBTENER TODAS LAS CLASES
router.get("/", authMiddleware, getItems)

// RUTA PARA BUSCAR POR ID
router.get("/:id", authMiddleware, getItem)

// RUTA PARA CREAR CLASE
router.post("/", authMiddleware, validatorCreateItem, createItem)

module.exports = router