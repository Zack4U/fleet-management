const express = require("express");
const TaskController = require("../controller/TaskController");
const router = express.Router();
const multer = require("multer");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const upload = multer();

router.use(AuthMiddleware);

// Get all tasks
router.get("/", TaskController.getTasks);

// Get my tasks
router.get("/my", TaskController.getMyTasks);

// Get a single task by ID
router.get("/:id", TaskController.getTaskById);

// Create a new task
router.post("/new", upload.none(), TaskController.createTask);

// Update a task by ID
router.patch("/edit/:id", upload.none(), TaskController.updateTask);

// Delete a task by ID
router.delete("/delete/:id", TaskController.deleteTask);

module.exports = router;
