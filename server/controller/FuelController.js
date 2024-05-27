const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const createFuel = async (req, res) => {
    try {
        const data = req.body;
        const fuel = await prisma.fuel.create({ data });
        res.status(201).json(fuel);
    } catch (error) {
        console.error("Error creating fuel:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getFuelById = async (req, res) => {
    try {
        const id = req.params.id;
        const fuel = await prisma.fuel.findUnique({ where: { id } });
        if (fuel) {
            res.status(201).json(fuel);
        } else {
            res.status(404).json({ error: "Fuel not found" });
        }
    } catch (error) {
        console.error("Error retrieving fuel:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateFuel = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const fuel = await prisma.fuel.update({
            where: { id },
            data,
        });
        res.status(201).json(fuel);
    } catch (error) {
        console.error("Error updating fuel:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteFuel = async (req, res) => {
    try {
        const id = req.params.id;
        const fuel = await prisma.fuel.delete({ where: { id } });
        res.json({ message: "Fuel deleted" });
    } catch (error) {
        console.error("Error deleting fuel:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    createFuel,
    getFuelById,
    updateFuel,
    deleteFuel,
};
