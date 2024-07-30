const express = require("express");
const {handleRegister, handleLogin} = require("../controllers/user");
const {authenticateToken} = require("../middleware/authenticate");

const router = express.Router();

router.post("/register", handleRegister);

router.post("/login", handleLogin);

module.exports = router;