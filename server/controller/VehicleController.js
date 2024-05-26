const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get all users
const getVehicles = async (req, res) => {
    try {
        const data = await prisma.vehicle.findMany({});
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to get vehicles" });
    }
};

// Get a single user by ID
const getVehicleById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await prisma.vehicle.findUnique({
            where: { id },
            include: {
                Fuel: true,
                Oil: true,
                Cooling: true,
                Battery: true,
                Lights: true,
                Pneumatics: true,
            },
        });
        if (!data) {
            return res.status(404).json({ error: "Vehicle not found" });
        }
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to get Vehicle" });
    }
};

// Create a new user
const createVehicle = async (req, res) => {
    const {
        plate,
        brand,
        model,
        type,
        capacity,
        kilometers,
        number_tires,
        capacity_fuel,
        capacity_oil,
        capacity_cooling,
    } = req.body;
    const image = req.file ? req.file.filename : "camion-coca_cola.jpg";

    try {
        // Crear instancias de fuel, oil, cooling, battery
        const fuel = await prisma.fuel.create({
            data: {
                liters: parseInt(capacity_fuel),
                available: parseInt(capacity_fuel),
            },
        });
        const oil = await prisma.oil.create({
            data: {
                liters: parseInt(capacity_oil),
                brand: "default",
                type: "default",
            },
        });
        const cooling = await prisma.cooling.create({
            data: {
                liters: parseInt(capacity_cooling),
                brand: "default",
            },
        });
        const battery = await prisma.battery.create({
            data: {
                voltage: 12,
                amperage: 100,
                brand: "default",
                type: "default",
            },
        });

        // Crear instancias de luces
        const lights = await Promise.all([
            prisma.lights.create({
                data: {
                    brand: "default",
                    type: "default",
                    position: "delanteras",
                },
            }),
            prisma.lights.create({
                data: {
                    brand: "default",
                    type: "default",
                    position: "traseras",
                },
            }),
            prisma.lights.create({
                data: {
                    brand: "default",
                    type: "default",
                    position: "laterales",
                },
            }),
            prisma.lights.create({
                data: {
                    brand: "default",
                    type: "default",
                    position: "internas",
                },
            }),
        ]);

        // Crear instancias de neumáticos
        const pneumatics = await Promise.all(
            Array(number_tires)
                .fill()
                .map(() =>
                    prisma.pneumatic.create({
                        data: {
                            brand: "default",
                            model: "default",
                            size: "default",
                            type: "default",
                            pressure: 0,
                            diameter: 0,
                            width: 0,
                            height: 0,
                            position: "default",
                        },
                    })
                )
        );

        // Crear el vehículo
        const newVehicle = await prisma.vehicle.create({
            data: {
                plate,
                brand,
                model,
                type,
                capacity: parseInt(capacity),
                kilometers: parseInt(kilometers),
                fuelId: fuel.id,
                OilId: oil.id,
                CoolingId: cooling.id,
                BatteryId: battery.id,
                Lights: { connect: lights.map((light) => ({ id: light.id })) },
                Pneumatics: {
                    connect: pneumatics.map((pneumatic) => ({
                        id: pneumatic.id,
                    })),
                },
                image,
            },
        });

        res.status(201).json(newVehicle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create vehicle" });
    }
};

// Update a user by ID
const updateVehicle = async (req, res) => {
    const { id } = req.params;
    const {} = req.body;
    const image = req.file
        ? req.file.filename
        : prisma.user.findUnique({ where: { id } }).image;
    try {
        const updatedVehicle = await prisma.vehicle.update({
            where: { id },
            data: {},
        });
        res.status(201).json(updatedVehicle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update vehicle" });
    }
};

// Delete a user by ID
const deleteVehicle = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.vehicle.delete({
            where: { id },
        });
        res.status(201).json({ message: "Vehicle deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete Vehicle" });
    }
};

const getImage = async (req, res) => {
    try {
        const { file_name } = req.params;
        res.sendFile(file_name, { root: "uploads/vehicles" });
    } catch (error) {
        res.status(500).json({ error: "Failed to get vehicle image" });
    }
};

module.exports = {
    getVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    getImage,
};
