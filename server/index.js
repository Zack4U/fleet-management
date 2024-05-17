const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./routes/UserRoutes");

// Load environment variables from .env filen
dotenv.config();

// Create Express app
const app = express();

//
app.use(cors());

// parse application/json
app.use(bodyParser.json());

//Configure User Routes
app.use("/api/users", userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[index.js] Server is running on http://localhost:${PORT}`);
});
