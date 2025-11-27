require("dotenv").config();
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

const dbPool = new Pool();

async function migrate() {
    const sql = fs.readFileSync(path.join(__dirname, "db.sql"), "utf8");
    await dbPool.query(sql);

    const roleCheck = await dbPool.query(
        `SELECT * FROM role WHERE name_role = $1`,
        ["admin"]
    );
    if (roleCheck.rows.length === 0) {
        console.log("Creation des roles...");
        await dbPool.query(
            `
            INSERT INTO role (name_role) VALUES ($1), ($2)
        `,
            ["admin", "stagiaire"]
        );
    }

    const check = await dbPool.query(`SELECT * FROM users WHERE email = $1`, [
        "Tibo@gmail.com",
    ]);

    if (check.rows.length === 0) {
        console.log("Utilisateur de test...");
        await dbPool.query(
            `
            INSERT INTO users 
            (lastname, firstname, pseudo, email, password, profile_picture, status,id_role)
            VALUES ($1, $2, $3, $4, $5, $6, $7,$8)
        `,
            [
                "Tibo",
                "Obit",
                "TiboobiT",
                "Tibo@gmail.com",
                "123456",
                "https://example.com/pic1.jpg",
                true,
                1,
            ]
        );
    } else {
        console.log("Utilisateur de test déjà présent");
    }
}

module.exports = { dbPool, migrate };
