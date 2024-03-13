const express = require("express")
const router = express.Router()

const { getItems, getItem, createItem } = require("../controllers/clases") // SI VAMOS AÑADIENDO FUNCIONES, LAS PONEMOS AQUI EN LOS CORCHETES
const { validatorCreateItem } = require("../validators/clases")

router.get("/", getItems)

// RUTA PARA BUSCAR POR ID
router.get("/:id", getItem) //HARA FUNCIÓN QUE ESTA DEIFINA EN EL CONTROLADOR (POR CADA UNA)


// RUTA PARA CREAR CLASE
router.post("/", validatorCreateItem, createItem)
// SI HAY QUE AÑADIR MIDDLE WARE -> DEFINIDO EN LOS VALIDATORS, SI NO ESTAN LOS
// EL MIDDLEWARE CONTIENE => AUTENTIFICACIÓN, PRIMERO HACER PRUEBA SIN TOKEN Y SI NOS DA TIEMPO LO AÑADIMOS
//router.post("/", MIDDELWARE, createItem)
// TENER EN CUENTA EL TIPO DE PETICION QUE HACE
module.exports = router