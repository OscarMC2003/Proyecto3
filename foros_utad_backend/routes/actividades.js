const express = require("express")
const router = express.Router()

const { getItems, getItem, createItem, updateItem, deleteItem, addActivityUser } = require("../controllers/actividades")
const { validatorCreateItem, validatorAddActivity } = require("../validators/actividades")
const authMiddleware = require("../middleware/session")

// RUTA PARA OBTENER TODAS LAS ACTIVIDADES
router.get("/", authMiddleware, getItems)

// RUTA PARA BUSCAR POR ID
router.get("/:id", authMiddleware, getItem)

// RUTA PARA BORRAR POR ID
router.delete("/:id", authMiddleware, deleteItem)

// RUTA PARA CREAR CLASE
router.post("/createActivities", authMiddleware, validatorCreateItem, createItem)

// RUTA PARA ACTUALIZAR ACTIVIDAD
router.post("/updateActivities", authMiddleware, validatorCreateItem, updateItem)

// RUTA PARA AÑADIR UNA ACTIVIDAD A UN USUARIO
router.patch("/:_id", authMiddleware, validatorAddActivity, addActivityUser)

module.exports = router