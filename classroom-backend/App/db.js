require("dotenv").config();
const { Pool } = require("pg");

const dbPool = new Pool();

async function migrate() {
    // Créer la table si elle n'existe pas
    await dbPool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id_users SERIAL PRIMARY KEY,
            lastname VARCHAR(50) NOT NULL,
            firstname VARCHAR(50) NOT NULL,
            pseudo VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            profile_picture VARCHAR(150),
            status BOOLEAN
        );
    `);

    const check = await dbPool.query(`SELECT * FROM users WHERE email = $1`, [
        "Tibo@gmail.com",
    ]);

    if (check.rows.length === 0) {
        console.log("Utilisateur de test...");
        await dbPool.query(
            `
            INSERT INTO users 
            (lastname, firstname, pseudo, email, password, profile_picture, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
            [
                "Tibo",
                "Obit",
                "TiboobiT",
                "Tibo@gmail.com",
                "123456",
                "https://example.com/pic1.jpg",
                true,
            ]
        );
    } else {
        console.log("Utilisateur de test déjà présent");
    }
}

module.exports = { dbPool, migrate };
