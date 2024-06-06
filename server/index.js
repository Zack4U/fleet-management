const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./routes/UserRoutes");
const vehicleRoutes = require("./routes/VehicleRoutes");
const taskRoutes = require("./routes/TaskRoutes");
const RouteRoutes = require("./routes/RouteRoutes");
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

//Configure User Routes
app.use("/api/users", userRoutes);

//Configure Vehicle Routes
app.use("/api/vehicles", vehicleRoutes);

//Configure Task Routes
app.use("/api/tasks", taskRoutes);

//Configure Route Routes
app.use("/api/routes", RouteRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[index.js] Server is running on http://localhost:${PORT}`);
});
