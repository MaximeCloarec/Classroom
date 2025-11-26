const express = require("express");
const UserController = require("../controller/UserController.js");

const userRoutes = () => {
    const router = express.Router();

    router.get("/test", (req, res) => UserController.getAllUsers(req, res));
    router.post("/register", (req, res) => UserController.register(req, res));

    return router;
};

module.exports = userRoutes;
