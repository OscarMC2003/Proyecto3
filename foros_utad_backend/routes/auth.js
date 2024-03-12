const express = require("express");

const { loginCtrl } = require("../controllers/auth");
const router = express.Router();


router.post("/login",  loginCtrl); 

module.exports = router;
