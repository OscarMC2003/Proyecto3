const express = require("express")
const router = express.Router()

const { getItems, getItem, createItem, addActivityUser } = require("../controllers/actividades")
const { validatorCreateItem, validatorAddActivity } = require("../validators/actividades")
const authMiddleware = require("../middleware/authenticate")

router.get("/", getItems)

// RUTA PARA BUSCAR POR ID
router.get("/:id", getItem)

// RUTA PARA CREAR CLASE
router.post("/createActivities", validatorCreateItem, createItem)

// RUTA PARA AÑADIR UNA ACTIVIDAD A UN USUARIO
router.patch("/:_id", authMiddleware, validatorAddActivity, addActivityUser)

module.exports = router