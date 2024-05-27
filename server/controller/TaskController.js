const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createTask = async (req, res) => {
    const { title, body, list } = req.body;
    try {
        const task = await prisma.task.create({
            data: { title, body, list: parseInt(list) },
        });
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating task" });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.status(201).json(tasks);
    } catch (error) {
        console.error("Error retrieving tasks:", error);
        res.status(500).json({ error: "Error retrieving tasks" });
    }
};

const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await prisma.task.findUnique({
            where: { id },
        });
        if (!task) {
            res.status(404).json({ error: "Task not found" });
        }
        res.status(201).json(task);
    } catch (error) {
        console.error("Error retrieving task:", error);
        res.status(500).json({ error: "Error retrieving task" });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, body, list } = req.body;
    try {
        const task = await prisma.task.update({
            where: { id },
            data: {
                title,
                body,
                list: parseInt(list),
            },
        });
        res.status(201).json(task);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Error updating task" });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await prisma.task.delete({ where: { id } });
        res.status(201).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Error deleting task" });
    }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
