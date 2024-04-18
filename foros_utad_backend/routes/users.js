const express = require("express")
const router = express.Router()

// FUNCIONES CONTROLLER USERS
const { getItems, getItem, createItem, login, updateItem } = require("../controllers/users")
const { validatorCreateItem } = require("../validators/users")

router.get("/", getItems)

router.get("/:id", getItem)

router.post("/", validatorCreateItem, createItem)

router.put("/:email", updateItem)

module.exports = router