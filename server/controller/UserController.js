const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to get users" });
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to get user" });
    }
};

// Create a new user
const createUser = async (req, res) => {
    const {
        email,
        first_name,
        second_name,
        first_lastname,
        second_lastname,
        current_password,
        status,
    } = req.body;
    const avatar = req.file ? req.file.filename : null;
    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                first_name,
                second_name,
                first_lastname,
                second_lastname,
                current_password,
                status,
                avatar,
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create user" });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    const { id } = req.params;
    const {
        email,
        first_name,
        second_name,
        first_lastname,
        second_lastname,
        current_password,
        status,
    } = req.body;
    const avatar = req.file
        ? req.file.filename
        : prisma.user.findUnique({ where: { id } }).avatar;
    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                email,
                first_name,
                second_name,
                first_lastname,
                second_lastname,
                current_password,
                status,
                avatar,
            },
        });
        res.status(201).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to update user" });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: { id },
        });
        res.status(201).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
