const express = require("express")
const router = express.Router()

const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/clases")
const { validatorCreateItem, validatorGetItem } = require("../validators/clases")
const authMiddleware = require("../middleware/session")

// RUTA PARA OBTENER TODAS LAS CLASES
router.get("/", authMiddleware, getItems)

// RUTA PARA BUSCAR POR ID
router.get("/:id", authMiddleware, validatorGetItem, getItem)

// RUTA PARA CREAR CLASE
router.post("/", authMiddleware, validatorCreateItem, createItem)

// RUTA PARA MODIFICAR DATOS DE UNA CLASE EN ESPECÍFICO
router.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem, updateItem)

// RUTA PARA BORRAR CLASE EN ESPECÍFICO
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem)

module.exports = router