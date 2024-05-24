const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createPneumatic = async (data) => {
    try {
        const pneumatic = await prisma.pneumatic.create({ data });
        return pneumatic;
    } catch (error) {
        console.error("Error creating pneumatic:", error);
        throw error;
    }
};

const getPneumaticById = async (id) => {
    try {
        const pneumatic = await prisma.pneumatic.findUnique({ where: { id } });
        return pneumatic;
    } catch (error) {
        console.error("Error retrieving pneumatic:", error);
        throw error;
    }
};

const updatePneumatic = async (id, data) => {
    try {
        const pneumatic = await prisma.pneumatic.update({
            where: { id },
            data,
        });
        return pneumatic;
    } catch (error) {
        console.error("Error updating pneumatic:", error);
        throw error;
    }
};

const deletePneumatic = async (id) => {
    try {
        const pneumatic = await prisma.pneumatic.delete({ where: { id } });
        return pneumatic;
    } catch (error) {
        console.error("Error deleting pneumatic:", error);
        throw error;
    }
};

module.exports = {
    createPneumatic,
    getPneumaticById,
    updatePneumatic,
    deletePneumatic,
};
