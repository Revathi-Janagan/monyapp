const express = require("express");
const router = express.Router();
const multer = require("multer");

const login = require("../Controller/Login/login");

router.post("/login",login.login);

module.exports = router;