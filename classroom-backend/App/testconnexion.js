const pool = require("./db");

pool.connect()
    .then(async (client) => {
        try {
            const res = await client
                .query("SELECT NOW()");
            console.log("Connexion OK :", res.rows[0]);
            client.release();
        } catch (err_1) {
            client.release();
            console.error("Erreur de requête", err_1.stack);
        }
    })
    .catch((err) => console.error("Erreur de connexion", err.stack));
