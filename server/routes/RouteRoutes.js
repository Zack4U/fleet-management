const express = require("express");
const RouteController = require("../controller/RouteController");
const router = express.Router();
const multer = require("multer");
const upload = multer();

// Get all tasks
router.get("/", RouteController.getRoutes);

// Get a single task by ID
router.get("/:id", RouteController.getRouteById);

// Create a new task
router.post("/new", upload.none(), RouteController.createRoute);

// Update a task by ID
router.patch("/edit/:id", upload.none(), RouteController.updateRoute);

// Delete a task by ID
router.delete("/delete/:id", RouteController.deleteRoute);

module.exports = router;
