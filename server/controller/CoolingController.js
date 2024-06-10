const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get all coolings
const getCoolings = async (req, res) => {
    try {
        const data = await prisma.cooling.findMany();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get coolings" });
    }
};

// Get a single cooling by ID
const getCoolingById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await prisma.cooling.findUnique({
            where: { id },
        });
        console.log(data);
        if (!data) {
            return res.status(404).json({ error: "Cooling not found" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get cooling" });
    }
};

// Create a new cooling
const createCooling = async (req, res) => {
    const { liters, brand, type, vehicleId } = req.body;
    try {
        const oldCooling = await prisma.cooling.findMany({
            where: { vehicleId: vehicleId, in_use: true },
        });

        for (let cooling of oldCooling) {
            await prisma.cooling.update({
                where: { id: cooling.id },
                data: {
                    in_use: false,
                },
            });
        }

        const newCooling = await prisma.cooling.create({
            data: {
                liters: parseInt(liters),
                brand,
                type,
                vehicle: {
                    connect: { id: vehicleId },
                },
            },
        });
        res.status(201).json(newCooling);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create cooling" });
    }
};

// Update a cooling by ID
const updateCooling = async (req, res) => {
    const { id } = req.params;
    const { liters, brand, type } = req.body;
    try {
        const updatedCooling = await prisma.cooling.update({
            where: { id },
            data: {
                liters: parseInt(liters),
                brand,
                type,
            },
        });
        res.status(200).json(updatedCooling);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update cooling" });
    }
};

// Delete a cooling by ID
const deleteCooling = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.cooling.delete({
            where: { id },
        });
        res.status(200).json({ message: "Cooling deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete cooling" });
    }
};

module.exports = {
    getCoolings,
    getCoolingById,
    createCooling,
    updateCooling,
    deleteCooling,
};
