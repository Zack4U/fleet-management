const express = require("express");
const UserController = require("../controller/UserController");
const multer = require("multer");
const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/avatars");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Get all users
router.get("/", UserController.getUsers);

// Get a single user by ID
router.get("/:id", UserController.getUserById);

// Create a new user
router.post("/", upload.single("avatar"), UserController.createUser);

// Update a user by ID
router.patch("/:id", upload.single("avatar"), UserController.updateUser);

// Delete a user by ID
router.delete("/:id", UserController.deleteUser);

module.exports = router;
