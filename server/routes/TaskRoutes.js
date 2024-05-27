const express = require("express");
const TaskController = require("../controller/TaskController");
const router = express.Router();
const multer = require("multer");
const upload = multer();

// Get all tasks
router.get("/", TaskController.getTasks);

// Get a single task by ID
router.get("/:id", TaskController.getTaskById);

// Create a new task
router.post("/new", upload.none(), TaskController.createTask);

// Update a task by ID
router.patch("/edit/:id", upload.none(), TaskController.updateTask);

// Delete a task by ID
router.delete("/delete/:id", TaskController.deleteTask);

module.exports = router;
