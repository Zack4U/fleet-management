const express = require("express");
const VehicleController = require("../controller/VehicleController");
const multer = require("multer");
const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/vehicles");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Get all users
router.get("/", VehicleController.getVehicles);

// Get a single user by ID
router.get("/:id", VehicleController.getVehicleById);

// Create a new user
router.post("/new", upload.single("image"), VehicleController.createVehicle);

// Update a user by ID
router.patch(
    "/edit/:id",
    upload.single("image"),
    VehicleController.updateVehicle
);

// Delete a user by ID
router.delete("/delete/:id", VehicleController.deleteVehicle);

// Obtener avatar por nombre
router.get("/image/:file_name", VehicleController.getImage);

module.exports = router;
