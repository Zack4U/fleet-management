const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./routes/UserRoutes");
const vehicleRoutes = require("./routes/VehicleRoutes");
const taskRoutes = require("./routes/TaskRoutes");
const RouteRoutes = require("./routes/RouteRoutes");
const BatteryRoutes = require("./routes/BatteryRoutes");
const OilRoutes = require("./routes/OilRoutes");
const PneumaticRoutes = require("./routes/PneumaticRoutes");
const CoolingRoutes = require("./routes/CoolingRoutes");
const fuelRoutes = require("./routes/FuelRoutes");
const LightRoutes = require("./routes/LightRoutes");

const generalRoutes = require("./routes/GeneralRoutes");

// Load environment variables from .env filen
dotenv.config();

// Create Express app
const app = express();

//
app.use(cors());

// parse application/json
app.use(bodyParser.json());

//Configure General Routes
app.use("/api/users", generalRoutes);

// Configure routes
app.use("/api/users", userRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/routes", RouteRoutes);
app.use("/api/batteries", BatteryRoutes);
app.use("/api/oils", OilRoutes);
app.use("/api/pneumatics", PneumaticRoutes);
app.use("/api/coolings", CoolingRoutes);
app.use("/api/fuels", fuelRoutes);
app.use("/api/lights", LightRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[index.js] Server is running on http://localhost:${PORT}`);
});
