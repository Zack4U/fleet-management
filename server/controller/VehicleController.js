const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get all users
const getVehicles = async (req, res) => {
    try {
        const data = await prisma.vehicle.findMany();
        res.status(201).json(data);
    } catch (error) {
        console.log(error);
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
                fuel: true,
                oil: {
                    where: { in_use: true },
                },
                cooling: {
                    where: { in_use: true },
                },
                battery: {
                    where: { in_use: true },
                },
                lights: {
                    where: { in_use: true },
                },
                pneumatics: {
                    where: { in_use: true },
                },
            },
        });
        console.log(data);
        if (!data) {
            return res.status(404).json({ error: "Vehicle not found" });
        }
        res.status(201).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get Vehicle" });
    }
};

// Create a new user
const createVehicle = async (req, res) => {
    const {
        plate,
        brand,
        line,
        model,
        type,
        capacity,
        kilometers,
        front_right_tires,
        front_left_tires,
        back_right_tires,
        back_left_tires,
        capacity_fuel,
        capacity_oil,
        capacity_cooling,
    } = req.body;
    const image = req.file ? req.file.filename : "camion-coca_cola.jpg";
    const position = { lat: 5.070275, lng: -75.513817 };
    try {
        if (
            isNaN(Number(front_right_tires)) ||
            Number(front_right_tires) <= 0 ||
            isNaN(Number(front_left_tires)) ||
            Number(front_left_tires) <= 0 ||
            isNaN(Number(back_right_tires)) ||
            Number(back_right_tires) <= 0 ||
            isNaN(Number(back_left_tires)) ||
            Number(back_left_tires) <= 0
        ) {
            throw new Error("number_tires must be a number greater than 0");
        }

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
            },
        });
        const cooling = await prisma.cooling.create({
            data: {
                liters: parseInt(capacity_cooling),
            },
        });
        const battery = await prisma.battery.create({ data: {} });

        // Define the light positions
        const lightPositions = ["front", "back", "side", "inside"];

        // Create the lights for each position
        const lights = await Promise.all(
            lightPositions.map((position) =>
                prisma.lights.create({
                    data: {
                        position: position,
                    },
                })
            )
        );

        // Define the number of tires for each position
        const tireCounts = {
            "Front Right": Number(front_right_tires),
            "Front Left": Number(front_left_tires),
            "Back Right": Number(back_right_tires),
            "Back Left": Number(back_left_tires),
        };

        // Create the tires for each position
        const pneumatics = await Promise.all(
            Object.entries(tireCounts).flatMap(([position, count]) =>
                Array(count)
                    .fill()
                    .map(() =>
                        prisma.pneumatic.create({
                            data: {
                                position: position,
                            },
                        })
                    )
            )
        );

        // Crear el vehículo
        const newVehicle = await prisma.vehicle.create({
            data: {
                plate,
                brand,
                line,
                model,
                type,
                capacity: parseInt(capacity),
                kilometers: parseInt(kilometers),
                fuelId: fuel.id,
                oil: { connect: { id: oil.id } },
                cooling: { connect: { id: cooling.id } },
                battery: { connect: { id: battery.id } },
                lights: { connect: lights.map((light) => ({ id: light.id })) },
                pneumatics: {
                    connect: pneumatics.map((pneumatic) => ({
                        id: pneumatic.id,
                    })),
                },
                image,
                position,
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
    try {
        const { id } = req.params;
        const {
            plate,
            brand,
            line,
            model,
            type,
            capacity,
            kilometers,
            legals,
            statusId,
            fuelId,
            driverId,
            pneumatics,
            oil,
            cooling,
            lights,
            battery,
            maintenance,
            last_maintenance,
            last_oil_change,
            last_cooling_change,
            last_battery_change,
            last_pneumatic_change,
            last_light_change,
            oil_change_period,
            cooling_change_period,
            battery_review_period,
            pneumatic_review_period,
        } = req.body;
        const image = req.file
            ? req.file.filename
            : prisma.user.findUnique({ where: { id } }).image;
        const driver = null;
        if (driverId) {
            driver = await prisma.user.findUnique({
                where: { id: driverId },
            });

            if (!driver)
                return res.status(404).json({ error: "Driver not found" });
        }

        const updatedVehicle = await prisma.vehicle.update({
            where: { id },
            data: {
                plate,
                brand,
                line,
                model,
                type,
                capacity: capacity ? parseInt(capacity) : undefined,
                kilometers: kilometers ? parseInt(kilometers) : undefined,
                legals,
                statusId,
                fuelId,
                driverId,
                pneumatics,
                oil,
                cooling,
                lights,
                battery,
                maintenance,
                image,
                last_maintenance,
                last_oil_change,
                last_cooling_change,
                last_battery_change,
                last_pneumatic_change,
                last_light_change,
                oil_change_period,
                cooling_change_period,
                battery_review_period,
                pneumatic_review_period,
            },
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
        const vehicle = await prisma.vehicle.findUnique({
            where: { id },
            include: {
                fuel: true,
            },
        });

        await prisma.fuel.delete({ where: { id: vehicle.fuel.id } });
        await prisma.refueling.deleteMany({
            where: { fuelId: vehicle.fuel.id },
        });
        await prisma.oil.deleteMany({ where: { vehicleId: vehicle.id } });
        await prisma.cooling.deleteMany({ where: { vehicleId: vehicle.id } });
        await prisma.battery.deleteMany({ where: { vehicleId: vehicle.id } });
        await prisma.lights.deleteMany({
            where: { vehicleId: id },
        });
        await prisma.pneumatic.deleteMany({
            where: { vehicleId: id },
        });

        await prisma.vehicle.delete({ where: { id } });

        res.status(201).json({ message: "Vehicle deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete Vehicle" });
    }
};

const getImage = async (req, res) => {
    try {
        const { file_name } = req.params;
        res.sendFile(file_name, { root: "uploads/vehicles" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get vehicle image" });
    }
};

const changeOil = async (req, res) => {
    try {
        const { id } = req.params;

        const vehicle = await prisma.vehicle.findUnique({
            where: { id },
        });

        const updatedVehicle = await prisma.vehicle.update({
            where: { id },
            data: {
                last_oil_change: new Date(),
            },
        });

        res.status(201).json(updatedVehicle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to change oil" });
    }
};

const changeCooling = async (req, res) => {
    try {
        const { id } = req.params;

        const vehicle = await prisma.vehicle.findUnique({
            where: { id },
        });

        const updatedVehicle = await prisma.vehicle.update({
            where: { id },
            data: {
                last_cooling_change: new Date(),
            },
        });

        res.status(201).json(updatedVehicle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to change cooling" });
    }
};

const changeBattery = async (req, res) => {
    try {
        const { id } = req.params;

        const vehicle = await prisma.vehicle.findUnique({
            where: { id },
        });

        const updatedVehicle = await prisma.vehicle.update({
            where: { id },
            data: {
                last_battery_change: new Date(),
            },
        });

        res.status(201).json(updatedVehicle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to change battery" });
    }
};

const changePneumatic = async (req, res) => {
    try {
        const { id } = req.params;

        const vehicle = await prisma.vehicle.findUnique({
            where: { id },
        });

        const updatedVehicle = await prisma.vehicle.update({
            where: { id },
            data: {
                last_pneumatic_change: new Date(),
            },
        });

        res.status(201).json(updatedVehicle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to change pneumatic" });
    }
};

const changeLight = async (req, res) => {
    try {
        const { id } = req.params;

        const vehicle = await prisma.vehicle.findUnique({
            where: { id },
        });

        const updatedVehicle = await prisma.vehicle.update({
            where: { id },
            data: {
                last_light_change: new Date(),
            },
        });

        res.status(201).json(updatedVehicle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to change light" });
    }
};

const reviewBattery = async (req, res) => {
    try {
        const { id } = req.params;

        const vehicle = await prisma.vehicle.findUnique({
            where: { id },
        });

        const updatedVehicle = await prisma.vehicle.update({
            where: { id },
            data: {
                last_review_battery: new Date(),
            },
        });

        res.status(201).json(updatedVehicle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to review battery" });
    }
};

const reviewPneumatic = async (req, res) => {
    try {
        const { id } = req.params;

        const vehicle = await prisma.vehicle.findUnique({
            where: { id },
        });

        const updatedVehicle = await prisma.vehicle.update({
            where: { id },
            data: {
                last_review_pneumatic: new Date(),
            },
        });

        res.status(201).json(updatedVehicle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to review pneumatic" });
    }
};

const reviewLight = async (req, res) => {
    try {
        const { id } = req.params;

        const vehicle = await prisma.vehicle.findUnique({
            where: { id },
        });

        const updatedVehicle = await prisma.vehicle.update({
            where: { id },
            data: {
                last_review_light: new Date(),
            },
        });

        res.status(201).json(updatedVehicle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to review light" });
    }
};

const getMyVehicles = async (req, res) => {
    try {
        const user = req.user;
        console.log(user);
        const { id } = user;
        const data = await prisma.vehicle.findMany({
            where: { driverId: id },
        });
        res.status(201).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get vehicles" });
    }
};

module.exports = {
    getVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    getImage,
    changeOil,
    changeCooling,
    changeBattery,
    changePneumatic,
    changeLight,
    reviewBattery,
    reviewPneumatic,
    reviewLight,
    getMyVehicles,
};
