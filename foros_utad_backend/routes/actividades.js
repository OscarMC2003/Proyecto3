const express = require("express")
const router = express.Router()

const { checkUserAlreadyJoined } = require ("../middleware/actividades")
const { getItems, getItem, createItem, updateItem, deleteItem, addActivityUser, addAsistentesOpcionales } = require("../controllers/actividades")
const { validatorCreateItem, validatorAddActivity } = require("../validators/actividades")
const authMiddleware = require("../middleware/session")


// RUTA PARA OBTENER TODAS LAS ACTIVIDADES
router.get("/", authMiddleware, getItems)

// RUTA PARA BUSCAR POR ID
router.get("/:id", authMiddleware, getItem)

// RUTA PARA CREAR ACTIVIDAD
router.post("/createActivities", authMiddleware, createItem)

// RUTA PARA ACTUALIZAR ACTIVIDAD
router.put("/:_id", authMiddleware, updateItem)

//RUTA PARA UNIRSE A UNA ACTIVIDAD
router.put('/joinActivity/:id', authMiddleware,checkUserAlreadyJoined, addAsistentesOpcionales )

// RUTA PARA AÑADIR UNA ACTIVIDAD A UN USUARIO
router.patch("/:_id", authMiddleware, validatorAddActivity, addActivityUser)

// RUTA PARA BORRAR POR ID
router.delete("/:id", authMiddleware, deleteItem)

module.exports = router
