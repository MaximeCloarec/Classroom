const express = require("express");
const cors = require("cors")

// Routes import
const userRoutes = require("./App/routes/userRoutes.js");
const app = express();
app.use(cors());

// Middlewares globaux
app.use(express.json());

// Routes principales utilisation
app.use("/api/users", userRoutes());
// 404
app.use((req, res) => {
    res.status(404).json({ message: "404 Not Found" });
});

module.exports = app;
