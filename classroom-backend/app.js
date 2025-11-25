const express = require("express");

// Routes import 


const app = express();

// Middlewares globaux
app.use(express.json());

// Routes principales utilisation

// 404
app.use((req, res) => {
    res.status(404).json({ message: "404 Not Found" });
});

module.exports = app;
