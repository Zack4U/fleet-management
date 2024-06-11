const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get all pneumatics
const getPneumatics = async (req, res) => {
    try {
        const data = await prisma.pneumatic.findMany();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get pneumatics" });
    }
};

// Get a single pneumatic by ID
const getPneumaticById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await prisma.pneumatic.findUnique({
            where: { id },
        });
        console.log(data);
        if (!data) {
            return res.status(404).json({ error: "Pneumatic not found" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get pneumatic" });
    }
};

// Create a new pneumatic
const createPneumatic = async (req, res) => {
    const {
        brand,
        model,
        size,
        type,
        pressure,
        diameter,
        width,
        height,
        position,
        pneumaticId,
        vehicleId,
    } = req.body;
    try {
        await prisma.pneumatic.update({
            where: { id: pneumaticId },
            data: {
                in_use: false,
            },
        });

        const newPneumatic = await prisma.pneumatic.create({
            data: {
                brand,
                model,
                size,
                type,
                pressure: parseInt(pressure),
                diameter: parseInt(diameter),
                width: parseInt(width),
                height: parseInt(height),
                position,
                vehicle: {
                    connect: { id: vehicleId },
                },
            },
        });
        res.status(201).json(newPneumatic);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create pneumatic" });
    }
};

// Update a pneumatic by ID
const updatePneumatic = async (req, res) => {
    const { id } = req.params;
    const { size, brand, type } = req.body;
    try {
        const updatedPneumatic = await prisma.pneumatic.update({
            where: { id },
            data: {
                size: parseInt(size),
                brand,
                type,
            },
        });
        res.status(200).json(updatedPneumatic);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update pneumatic" });
    }
};

// Delete a pneumatic by ID
const deletePneumatic = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.pneumatic.delete({
            where: { id },
        });
        res.status(200).json({ message: "Pneumatic deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete pneumatic" });
    }
};

module.exports = {
    getPneumatics,
    getPneumaticById,
    createPneumatic,
    updatePneumatic,
    deletePneumatic,
};
