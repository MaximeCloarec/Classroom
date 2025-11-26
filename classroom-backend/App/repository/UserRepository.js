const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
    constructor() {
        super(); // Appelle le constructeur de la classe parente
    }

    async findAllUsers() {
        const client = await this.getClient(); // Initalise un client de connexion 

        try {
            const res = await client.query("SELECT * FROM users");
            return res.rows;
        } catch (err) {
            console.error("Erreur de requête", err.stack);
        } finally {
            client.release(); // Libère le client de connexion
        }
    }
}

module.exports = new UserRepository();