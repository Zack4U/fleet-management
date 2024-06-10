const express = require("express");
const OilController = require("../controller/OilController");
const multer = require("multer");

const router = express.Router();
const upload = multer({});

// Get all oils
router.get("/", OilController.getOils);

// Get a single oil by ID
router.get("/:id", OilController.getOilById);

// Create a new oil
router.post("/new", upload.none(), OilController.createOil);

// Update an oil by ID
router.patch("/edit/:id", upload.none(), OilController.updateOil);

// Delete an oil by ID
router.delete("/delete/:id", OilController.deleteOil);

module.exports = router;
