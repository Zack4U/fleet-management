const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createPneumatic = async (req, res) => {
    try {
        const data = req.body;
        const pneumatic = await prisma.pneumatic.create({ data });
        res.status(201).json(pneumatic);
    } catch (error) {
        console.error("Error creating pneumatic:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getPneumaticById = async (req, res) => {
    try {
        const id = req.params.id;
        const pneumatic = await prisma.pneumatic.findUnique({ where: { id } });
        if (pneumatic) {
            res.json(pneumatic);
        } else {
            res.status(404).json({ error: "Pneumatic not found" });
        }
    } catch (error) {
        console.error("Error retrieving pneumatic:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updatePneumatic = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const pneumatic = await prisma.pneumatic.update({
            where: { id },
            data,
        });
        res.json(pneumatic);
    } catch (error) {
        console.error("Error updating pneumatic:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deletePneumatic = async (req, res) => {
    try {
        const id = req.params.id;
        const pneumatic = await prisma.pneumatic.delete({ where: { id } });
        res.status(201).json({ message: "Pneumatic deleted" });
    } catch (error) {
        console.error("Error deleting pneumatic:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    createPneumatic,
    getPneumaticById,
    updatePneumatic,
    deletePneumatic,
};
