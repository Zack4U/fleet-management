const express = require("express");
const BatteryController = require("../controller/BatteryController");
const multer = require("multer");
const router = express.Router();

const upload = multer({});

// Get all batteries
router.get("/", BatteryController.getBatteries);

// Get a single battery by ID
router.get("/:id", BatteryController.getBatteryById);

// Create a new battery
router.post("/new", upload.none(), BatteryController.createBattery);

// Update a battery by ID
router.patch("/edit/:id", upload.none(), BatteryController.updateBattery);

// Delete a battery by ID
router.delete("/delete/:id", BatteryController.deleteBattery);

module.exports = router;
