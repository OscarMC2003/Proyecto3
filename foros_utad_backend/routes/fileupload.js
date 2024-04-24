const express = require("express")
const router = express.Router()

const { getItem, createItem, deleteItem } = require("../controllers/fileupload")

router.get("/:id", getItem)
router.post("/uploadfile", createItem)
router.delete("/:_id", deleteItem)

module.exports = router
