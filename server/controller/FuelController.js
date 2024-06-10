const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get all fuels
const getFuels = async (req, res) => {
    try {
        const data = await prisma.fuel.findMany();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get fuels" });
    }
};

// Get a single fuel by ID
const getFuelById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await prisma.fuel.findUnique({
            where: { id },
        });
        console.log(data);
        if (!data) {
            return res.status(404).json({ error: "Fuel not found" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get fuel" });
    }
};

// Create a new fuel
const createFuel = async (req, res) => {
    const { liters, brand, type } = req.body;
    try {
        const newFuel = await prisma.fuel.create({
            data: {
                liters: parseInt(liters),
                brand,
                type,
            },
        });
        res.status(201).json(newFuel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create fuel" });
    }
};

// Update a fuel by ID
const updateFuel = async (req, res) => {
    const { id } = req.params;
    const { liters, brand, type } = req.body;
    try {
        const updatedFuel = await prisma.fuel.update({
            where: { id },
            data: {
                liters: parseInt(liters),
                brand,
                type,
            },
        });
        res.status(200).json(updatedFuel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update fuel" });
    }
};

// Delete a fuel by ID
const deleteFuel = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.fuel.delete({
            where: { id },
        });
        res.status(200).json({ message: "Fuel deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete fuel" });
    }
};

const refuel = async (req, res) => {
    const { id } = req.params;
    const { liters, type, cost } = req.body;
    const fuel = await prisma.fuel.findUnique({
        where: { id },
    });
    if (!fuel) {
        return res.status(404).json({ error: "Fuel not found" });
    }
    if (liters <= 0 || liters === "" || isNaN(liters)) {
        return res.status(400).json({ error: "Invalid liters" });
    }
    if (fuel.liters - fuel.available < liters) {
        return res.status(400).json({ error: "Too much fuel" });
    }
    try {
        const newRefuel = await prisma.refueling.create({
            data: {
                liters: parseInt(liters),
                type,
                cost: parseFloat(cost),
                fuel: {
                    connect: { id },
                },
            },
        });
        const newFuel = await prisma.fuel.update({
            where: { id },
            data: {
                available: fuel.available + parseFloat(liters),
                last_refuel: new Date(),
            },
        });
        res.status(201).json(newRefuel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create fuel" });
    }
};

const spendFuel = async (req, res) => {
    const { id } = req.params;
    const { liters } = req.body;
    const fuel = await prisma.fuel.findUnique({
        where: { id },
    });
    if (!fuel) {
        return res.status(404).json({ error: "Fuel not found" });
    }
    if (liters <= 0 || liters === "" || isNaN(liters)) {
        return res.status(400).json({ error: "Invalid liters" });
    }
    if (fuel.liters < liters) {
        return res.status(400).json({ error: "Not enough fuel" });
    }
    try {
        const newFuel = await prisma.fuel.update({
            where: { id },
            data: {
                available: fuel.available - parseInt(liters),
            },
        });
        res.status(201).json(newFuel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create fuel" });
    }
};

const getRefuels = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await prisma.refueling.findMany({
            where: { fuelId: id },
        });
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get refuels" });
    }
};

module.exports = {
    getFuels,
    getFuelById,
    createFuel,
    updateFuel,
    deleteFuel,
    refuel,
    spendFuel,
    getRefuels,
};
