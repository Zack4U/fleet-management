const express = require("express");
const CoolingController = require("../controller/CoolingController");
const multer = require("multer");
const router = express.Router();

const upload = multer({});
const AuthMiddleware = require("../middleware/AuthMiddleware");

router.use(AuthMiddleware);

// Get all coolings
router.get("/", CoolingController.getCoolings);

// Get a single cooling by ID
router.get("/:id", CoolingController.getCoolingById);

// Create a new cooling
router.post("/new", upload.none(), CoolingController.createCooling);

// Update a cooling by ID
router.patch("/edit/:id", upload.none(), CoolingController.updateCooling);

// Delete a cooling by ID
router.delete("/delete/:id", CoolingController.deleteCooling);

// Get all vehicle coolings
router.get("/vehicle/:id", CoolingController.getVehiclesCoolings);

module.exports = router;
