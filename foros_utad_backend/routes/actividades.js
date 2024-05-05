const express = require("express")
const router = express.Router()

const { getItems, getItem, createItem, updateItem, deleteItem, addActivityUser } = require("../controllers/actividades")
const { validatorCreateItem, validatorAddActivity } = require("../validators/actividades")
const authMiddleware = require("../middleware/authenticate")

router.get("/", getItems)

// RUTA PARA BUSCAR POR ID
router.get("/:id", getItem)

// RUTA PARA BORRAR POR ID
router.delete("/:id", deleteItem)

// RUTA PARA CREAR CLASE
router.post("/createActivities", validatorCreateItem, createItem)

// RUTA PARA ACTUALIZAR ACTIVIDAD
router.post("/updateActivities", validatorCreateItem, updateItem)

// RUTA PARA AÑADIR UNA ACTIVIDAD A UN USUARIO
router.patch("/:_id", authMiddleware, validatorAddActivity, addActivityUser)

module.exports = router
