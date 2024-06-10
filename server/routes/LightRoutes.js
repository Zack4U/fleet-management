const express = require("express");
const LightController = require("../controller/LightController");
const multer = require("multer");

const router = express.Router();
const upload = multer({});

// Get all lights
router.get("/", LightController.getLights);

// Get a single light by ID
router.get("/:id", LightController.getLightById);

// Create a new light
router.post("/new", upload.none(), LightController.createLight);

// Update a light by ID
router.patch("/edit/:id", upload.none(), LightController.updateLight);

// Delete a light by ID
router.delete("/delete/:id", LightController.deleteLight);

module.exports = router;
