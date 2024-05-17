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
router.post("/new", upload.single("avatar"), UserController.createUser);

// Update a user by ID
router.patch("/edit/:id", upload.single("avatar"), UserController.updateUser);

// Delete a user by ID
router.delete("/delete/:id", UserController.deleteUser);

// Obtener avatar por nombre
router.get("/avatar/:file_name", UserController.getAvatar);

module.exports = router;
