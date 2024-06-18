const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all oils
const getOils = async (req, res) => {
    try {
        const data = await prisma.oil.findMany();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get oils" });
    }
};

// Get a single oil by ID
const getOilById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await prisma.oil.findUnique({
            where: { id },
        });
        console.log(data);
        if (!data) {
            return res.status(404).json({ error: "Oil not found" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get oil" });
    }
};

// Create a new oil
const createOil = async (req, res) => {
    const { liters, brand, type, vehicleId } = req.body;
    try {
        const oldOil = await prisma.oil.findMany({
            where: { vehicleId: vehicleId, in_use: true },
        });

        for (let oil of oldOil) {
            await prisma.oil.update({
                where: { id: oil.id },
                data: {
                    in_use: false,
                },
            });
        }

        const newOil = await prisma.oil.create({
            data: {
                liters: parseInt(liters),
                brand,
                type,
                vehicle: {
                    connect: { id: vehicleId },
                },
            },
        });

        res.status(201).json(newOil);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create oil" });
    }
};

// Update an oil by ID
const updateOil = async (req, res) => {
    const { id } = req.params;
    const { liters, brand, type } = req.body;
    try {
        const updatedOil = await prisma.oil.update({
            where: { id },
            data: {
                liters: parseInt(liters),
                brand,
                type,
            },
        });
        res.status(200).json(updatedOil);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update oil" });
    }
};

// Delete an oil by ID
const deleteOil = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.oil.delete({
            where: { id },
        });
        res.status(200).json({ message: "Oil deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete oil" });
    }
};

const getVehicleOils = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await prisma.oil.findMany({
            where: { vehicleId: id },
        });
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get vehicle oils" });
    }
};

module.exports = {
    getOils,
    getOilById,
    createOil,
    updateOil,
    deleteOil,
    getVehicleOils,
};
