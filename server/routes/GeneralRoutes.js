const express = require("express");
const UserController = require("../controller/UserController");
const multer = require("multer");
const router = express.Router();
const upload = multer();

// Login user
router.post("/login", upload.none(), UserController.login);

//Logout user
router.post("/logout", upload.none(), UserController.logout);

// Get avatar by name
router.get("/avatar/:file_name", UserController.getAvatar);

module.exports = router;
