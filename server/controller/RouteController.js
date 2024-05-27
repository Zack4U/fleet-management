const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get all routes
const getRoutes = async (req, res) => {
    try {
        const routes = await prisma.route.findMany();
        res.status(200).json(routes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get routes" });
    }
};

// Get a single route by ID
const getRouteById = async (req, res) => {
    const { id } = req.params;
    try {
        const route = await prisma.route.findUnique({ where: { id } });
        if (!route) {
            return res.status(404).json({ error: "Route not found" });
        }
        res.status(200).json(route);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get route" });
    }
};

// Create a new route
const createRoute = async (req, res) => {
    const { vehicleId, driverId, startLocation, endLocation, startDateTime } =
        req.body;
    try {
        const newRoute = await prisma.route.create({
            data: {
                vehicleId,
                driverId,
                startLocation,
                endLocation,
                startDateTime: new Date(startDateTime),
            },
        });
        res.status(201).json(newRoute);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create route" });
    }
};

// Update a route by ID
const updateRoute = async (req, res) => {
    const { id } = req.params;
    const {
        vehicleId,
        driverId,
        startLocation,
        endLocation,
        startDateTime,
        endDateTime,
        status,
    } = req.body;
    try {
        const updatedRoute = await prisma.route.update({
            where: { id },
            data: {
                vehicleId,
                driverId,
                startLocation,
                endLocation,
                startDateTime: new Date(startDateTime),
                endDateTime: new Date(endDateTime),
                status,
            },
        });
        if (!updatedRoute) {
            return res.status(404).json({ error: "Route not found" });
        }
        res.status(200).json(updatedRoute);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update route" });
    }
};

// Delete a route by ID
const deleteRoute = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.route.delete({ where: { id } });
        res.status(200).json({ message: "Route deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete route" });
    }
};

module.exports = {
    getRoutes,
    getRouteById,
    createRoute,
    updateRoute,
    deleteRoute,
};
