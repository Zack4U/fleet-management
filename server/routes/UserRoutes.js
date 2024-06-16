const express = require("express");
const UserController = require("../controller/UserController");
const multer = require("multer");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const isAdmin = require("../middleware/isAdmin");
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

router.use(AuthMiddleware);

// Get all users
router.get("/", isAdmin, UserController.getUsers);

// Get drivers
router.get("/drivers", isAdmin, UserController.getDrivers);

// Get a single user by ID
router.get("/:id", isAdmin, UserController.getUserById);

// Create a new user
router.post(
    "/new",
    isAdmin,
    upload.single("avatar"),
    UserController.createUser
);

// Update a user by ID
router.patch(
    "/edit/:id",
    isAdmin,
    upload.single("avatar"),
    UserController.updateUser
);

// Delete a user by ID
router.delete("/delete/:id", isAdmin, UserController.deleteUser);

module.exports = router;
