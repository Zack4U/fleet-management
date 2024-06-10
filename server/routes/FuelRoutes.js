const express = require("express");
const FuelController = require("../controller/FuelController");
const multer = require("multer");
const router = express.Router();

const upload = multer({});

// Get all fuels
router.get("/", FuelController.getFuels);

// Get a single fuel by ID
router.get("/:id", FuelController.getFuelById);

// Create a new fuel
router.post("/new", upload.none(), FuelController.createFuel);

// Update a fuel by ID
router.patch("/edit/:id", upload.none(), FuelController.updateFuel);

// Delete a fuel by ID
router.delete("/delete/:id", FuelController.deleteFuel);

// Refuel a tank
router.post("/refuel/:id", upload.none(), FuelController.refuel);

// Spend fuel
router.post("/spend/:id", upload.none(), FuelController.spendFuel);

// Get refuels
router.get("/refuels/:id", FuelController.getRefuels);

module.exports = router;
