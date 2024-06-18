const express = require("express");
const RouteController = require("../controller/RouteController");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const AuthMiddleware = require("../middleware/AuthMiddleware");

router.use(AuthMiddleware);
// Get all tasks
router.get("/", RouteController.getRoutes);

// Get my routes
router.get("/my", RouteController.getMyRoutes);

// Get a single task by ID
router.get("/:id", RouteController.getRouteById);

// Create a new task
router.post("/new", upload.none(), RouteController.createRoute);

// Update a task by ID
router.patch("/edit/:id", upload.none(), RouteController.updateRoute);

// Delete a task by ID
router.delete("/delete/:id", RouteController.deleteRoute);

// Get Vehicle routes
router.get("/vehicle/:id", RouteController.getVehicleRoutes);

module.exports = router;
