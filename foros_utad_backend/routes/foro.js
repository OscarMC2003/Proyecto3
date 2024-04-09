const express = require("express")
const router = express.Router()

const { getItems, getItem, createItem, createMessage, obtainMessage} = require("../controllers/foro")
const { validatorCreateItem, validatorCreateMensaje } = require("../validators/foro")

router.get("/", getItems)

// RUTA PARA BUSCAR POR ID
router.get("/:id", getItem)

// RUTA PARA OBTENER TODOS LOS MENSAJES
router.get("/:id/mensajes", obtainMessage)

// RUTA PARA CREAR FORO
router.post("/", validatorCreateItem, createItem)

// RUTA PARA CREAR MENSAJES
router.post("/:id/mensaje", createMessage)

// SI HAY QUE AÑADIR MIDDLE WARE -> DEFINIDO EN LOS VALIDATORS, SI NO ESTAN LOS
// EL MIDDLEWARE CONTIENE => AUTENTIFICACIÓN, PRIMERO HACER PRUEBA SIN TOKEN Y SI NOS DA TIEMPO LO AÑADIMOS
//router.post("/", MIDDELWARE, createItem)
// TENER EN CUENTA EL TIPO DE PETICION QUE HACE
module.exports = router