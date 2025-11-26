require("dotenv").config({ path: __dirname + "/.env" });
const http = require("node:http");
const app = require("./app");
const { migrate } = require("./App/db");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, async () => {
    await migrate();
    console.log(`Server running on http://localhost:${PORT}`);
});

server.on("error", (err) => {
    console.error("Failed to start server:", err.message);
});

// node .\server.js dans le dossier classroom-backend pour lancer le serveur
