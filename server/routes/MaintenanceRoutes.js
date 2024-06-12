const express = require("express");
const MaintenanceController = require("../controller/MaintenanceController");
const multer = require("multer");

const router = express.Router();
const upload = multer({});

// Get all lights
router.get("/", MaintenanceController.getMaintenances);

// Get a single light by ID
router.get("/:id", MaintenanceController.getMaintenanceById);

// Create a new light
router.post("/new", upload.none(), MaintenanceController.createMaintenance);

// Update a light by ID
router.patch(
    "/edit/:id",
    upload.none(),
    MaintenanceController.updateMaintenance
);

// Delete a light by ID
router.delete("/delete/:id", MaintenanceController.deleteMaintenance);

// Get Maintenances by Vehicle ID
router.get("/vehicle/:id", MaintenanceController.getVehicleMaintenances);

module.exports = router;
