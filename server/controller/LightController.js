const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get all lights
const getLights = async (req, res) => {
    try {
        const data = await prisma.lights.findMany();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get lights" });
    }
};

// Get a single light by ID
const getLightById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await prisma.lights.findUnique({
            where: { id },
        });
        console.log(data);
        if (!data) {
            return res.status(404).json({ error: "Light not found" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get light" });
    }
};

// Create a new light
const createLight = async (req, res) => {
    const { brand, type, vehicleId, position } = req.body;
    try {
        const oldLight = await prisma.lights.findMany({
            where: { vehicleId: vehicleId, in_use: true, position: position },
        });

        for (let light of oldLight) {
            await prisma.lights.update({
                where: { id: light.id },
                data: {
                    in_use: false,
                },
            });
        }

        const newLight = await prisma.lights.create({
            data: {
                brand,
                type,
                vehicle: {
                    connect: { id: vehicleId },
                },
                position,
            },
        });

        res.status(201).json(newLight);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create light" });
    }
};

// Update a light by ID
const updateLight = async (req, res) => {
    const { id } = req.params;
    const { brand, type, position } = req.body;
    try {
        const updatedLight = await prisma.lights.update({
            where: { id },
            data: {
                brand,
                type,
                position,
            },
        });
        res.status(200).json(updatedLight);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update light" });
    }
};

// Delete a light by ID
const deleteLight = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.lights.delete({
            where: { id },
        });
        res.status(200).json({ message: "Light deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete light" });
    }
};

module.exports = {
    getLights,
    getLightById,
    createLight,
    updateLight,
    deleteLight,
};
