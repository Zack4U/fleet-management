const express = require("express");
const PneumaticController = require("../controller/PneumaticController");
const multer = require("multer");

const router = express.Router();
const upload = multer({});
const AuthMiddleware = require("../middleware/AuthMiddleware");

router.use(AuthMiddleware);

// Get all pneumatics
router.get("/", PneumaticController.getPneumatics);

// Get a single pneumatic by ID
router.get("/:id", PneumaticController.getPneumaticById);

// Create a new pneumatic
router.post("/new", upload.none(), PneumaticController.createPneumatic);

// Update a pneumatic by ID
router.patch("/edit/:id", upload.none(), PneumaticController.updatePneumatic);

// Delete a pneumatic by ID
router.delete("/delete/:id", PneumaticController.deletePneumatic);

module.exports = router;
