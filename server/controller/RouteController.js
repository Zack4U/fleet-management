const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get all routes
const getRoutes = async (req, res) => {
    try {
        let routes = await prisma.route.findMany();
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
    let {
        vehicleId,
        driverId,
        startLocation,
        endLocation,
        additionalLocations,
        duration,
        distance,
        dateScheduled,
    } = req.body;
    if (startLocation) {
        startLocation = JSON.parse(startLocation);
    }
    if (endLocation) {
        endLocation = JSON.parse(endLocation);
    }
    if (additionalLocations) {
        additionalLocations = JSON.parse(additionalLocations);
    }
    try {
        const newRoute = await prisma.route.create({
            data: {
                startLocation,
                endLocation,
                additionalLocations,
                duration,
                distance,
                dateScheduled: new Date(dateScheduled),
                vehicle: { connect: { id: vehicleId } },
                driver: { connect: { id: driverId } },
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
    try {
        const { id } = req.params;
        let {
            vehicleId,
            driverId,
            startLocation,
            endLocation,
            additionalLocations,
            duration,
            distance,
            dateScheduled,
            startDateTime,
            endDateTime,
            status,
        } = req.body;
        if (startLocation) {
            startLocation = JSON.parse(startLocation);
        }
        if (endLocation) {
            endLocation = JSON.parse(endLocation);
        }
        if (additionalLocations) {
            additionalLocations = JSON.parse(additionalLocations);
        }

        const updatedRoute = await prisma.route.update({
            where: { id },
            data: {
                startLocation: startLocation,
                endLocation: endLocation,
                additionalLocations: additionalLocations,
                duration: duration,
                distance: distance,
                dateScheduled: dateScheduled,
                startDateTime: startDateTime ? new Date(startDateTime) : null,
                endDateTime: endDateTime ? new Date(endDateTime) : null,
                status: status,
                vehicle: { connect: { id: vehicleId } },
                driver: { connect: { id: driverId } },
            },
        });
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

const getVehicleRoutes = async (req, res) => {
    const { vehicleId } = req.params;
    try {
        const routes = await prisma.route.findMany({
            where: { vehicleId },
        });
        if (routes.length === 0) {
            return res
                .status(404)
                .json({ error: "No routes found for vehicle" });
        }

        res.status(200).json(routes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get routes" });
    }
};

module.exports = {
    getRoutes,
    getRouteById,
    createRoute,
    updateRoute,
    deleteRoute,
    getVehicleRoutes,
};
