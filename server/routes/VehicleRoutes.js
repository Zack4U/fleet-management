const express = require("express");
const VehicleController = require("../controller/VehicleController");
const multer = require("multer");
const router = express.Router();
const AuthMiddleware = require("../middleware/AuthMiddleware");
const isAdmin = require("../middleware/isAdmin");

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

router.use(AuthMiddleware);

// Get all users
router.get("/", isAdmin, VehicleController.getVehicles);

// Create a new user
router.post(
    "/new",
    upload.single("image"),
    isAdmin,
    VehicleController.createVehicle
);

// Update a user by ID
router.patch(
    "/edit/:id",
    upload.single("image"),
    VehicleController.updateVehicle
);

// Delete a user by ID
router.delete("/delete/:id", isAdmin, VehicleController.deleteVehicle);

// Change oil by Vehicle ID
router.patch("/oil/:id", VehicleController.changeOil);

// Change battery by Vehicle ID
router.patch("/battery/:id", VehicleController.changeBattery);

// Change pneumatic by Vehicle ID
router.patch("/pneumatic/:id", VehicleController.changePneumatic);

// Change cooling by Vehicle ID
router.patch("/cooling/:id", VehicleController.changeCooling);

// Change light by Vehicle ID
router.patch("/light/:id", VehicleController.changeLight);

// Review battery by Vehicle ID
router.patch("/battery/review/:id", VehicleController.reviewBattery);

// Review pneumatic by Vehicle ID
router.patch("/pneumatic/review/:id", VehicleController.reviewPneumatic);

// Review light by Vehicle ID
router.patch("/light/review/:id", VehicleController.reviewLight);

// Get my vehicles
router.get("/my", VehicleController.getMyVehicles);

// Get a single user by ID
router.get("/:id", VehicleController.getVehicleById);

module.exports = router;
