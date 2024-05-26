const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createFuel = async (data) => {
    try {
        const fuel = await prisma.fuel.create({ data });
        return fuel;
    } catch (error) {
        console.error("Error creating fuel:", error);
        throw error;
    }
};

const getFuelById = async (id) => {
    try {
        const fuel = await prisma.fuel.findUnique({ where: { id } });
        return fuel;
    } catch (error) {
        console.error("Error retrieving fuel:", error);
        throw error;
    }
};

const updateFuel = async (id, data) => {
    try {
        const fuel = await prisma.fuel.update({
            where: { id },
            data,
        });
        return fuel;
    } catch (error) {
        console.error("Error updating fuel:", error);
        throw error;
    }
};

const deleteFuel = async (id) => {
    try {
        const fuel = await prisma.fuel.delete({ where: { id } });
        return fuel;
    } catch (error) {
        console.error("Error deleting fuel:", error);
        throw error;
    }
};

module.exports = {
    createFuel,
    getFuelById,
    updateFuel,
    deleteFuel,
};
