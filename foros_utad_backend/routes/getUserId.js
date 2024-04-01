const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { getId } = require("../controllers/users")

router.get('/', authenticate, getId)

module.exports = router;