const { Client } = require("pg");
require("dotenv").config();

async function createDatabase() {
    const client = new Client({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
        database: "postgres", // IMPORTANT : la base par défaut
    });

    try {
        await client.connect();

        // Vérifier si la base existe
        const dbName = "classroom";
        const check = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = $1`,
            [dbName]
        );

        if (check.rowCount === 0) {
            console.log("➡️ Base absente, création...");
            await client.query(`CREATE DATABASE ${dbName}`);
            console.log("✔️ Base créée !");
        } else {
            console.log("✔️ La base existe déjà.");
        }
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

createDatabase();
