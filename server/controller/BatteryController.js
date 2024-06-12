const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get all batters
const getBatteries = async (req, res) => {
    try {
        const data = await prisma.battery.findMany();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get batteries" });
    }
};

// Get a single batter by ID
const getBatteryById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await prisma.battery.findUnique({
            where: { id },
        });
        console.log(data);
        if (!data) {
            return res.status(404).json({ error: "Battery not found" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get battery" });
    }
};

// Create a new batter
const createBattery = async (req, res) => {
    const { brand, type, voltage, amperage, vehicleId } = req.body;
    try {
        const oldBattery = await prisma.battery.findMany({
            where: { vehicleId: vehicleId, in_use: true },
        });

        for (let battery of oldBattery) {
            await prisma.battery.update({
                where: { id: battery.id },
                data: {
                    in_use: false,
                },
            });
        }

        const newBattery = await prisma.battery.create({
            data: {
                brand,
                type,
                voltage: parseFloat(voltage),
                amperage: parseFloat(amperage),
                vehicle: {
                    connect: { id: vehicleId },
                },
            },
        });
        res.status(201).json(newBattery);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create battery" });
    }
};

// Update a batter by ID
const updateBattery = async (req, res) => {
    const { id } = req.params;
    const { brand, type, voltage, amperage } = req.body;
    try {
        const updatedBattery = await prisma.battery.update({
            where: { id },
            data: {
                brand,
                type,
                voltage,
                amperage,
            },
        });
        res.status(200).json(updatedBattery);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update battery" });
    }
};

// Delete a batter by ID
const deleteBattery = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.battery.delete({
            where: { id },
        });
        res.status(200).json({ message: "Battery deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete battery" });
    }
};

module.exports = {
    getBatteries,
    getBatteryById,
    createBattery,
    updateBattery,
    deleteBattery,
};
