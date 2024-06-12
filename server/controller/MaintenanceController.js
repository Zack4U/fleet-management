const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all maintenance
const getMaintenances = async (req, res) => {
    try {
        const data = await prisma.maintenance.findMany();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get maintenance tasks" });
    }
};

// Get a single maintenance task by ID
const getMaintenanceById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await prisma.maintenance.findUnique({
            where: { id },
        });
        console.log(data);
        if (!data) {
            return res
                .status(404)
                .json({ error: "Maintenance task not found" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get maintenance task" });
    }
};

// Create a new maintenance task
const createMaintenance = async (req, res) => {
    const { schedule_date, type, vehicleId } = req.body;
    try {
        const newTask = await prisma.maintenance.create({
            data: {
                schedule_date: new Date(schedule_date),
                type,
                vehicle: {
                    connect: { id: vehicleId },
                },
            },
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create maintenance task" });
    }
};

// Update a maintenance task by ID
const updateMaintenance = async (req, res) => {
    const { id } = req.params;
    const { schedule_date, finish_date, type, cost, notes, status, vehicleId } =
        req.body;
    try {
        const updatedTask = await prisma.maintenance.update({
            where: { id },
            data: {
                schedule_date: new Date(schedule_date),
                finish_date: new Date(finish_date),
                type,
                cost: parseInt(cost),
                notes,
                status,
                vehicle: {
                    connect: { id: vehicleId },
                },
            },
        });
        res.status(200).json(updatedTask);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update maintenance task" });
    }
};

// Delete a maintenance task by ID
const deleteMaintenance = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.maintenance.delete({
            where: { id },
        });
        res.status(200).json({
            message: "Maintenance task deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete maintenance task" });
    }
};

const getVehicleMaintenances = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await prisma.maintenance.findMany({
            where: { vehicleId: id },
        });
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get maintenance tasks" });
    }
};

module.exports = {
    getMaintenances,
    getMaintenanceById,
    createMaintenance,
    updateMaintenance,
    deleteMaintenance,
    getVehicleMaintenances,
};
