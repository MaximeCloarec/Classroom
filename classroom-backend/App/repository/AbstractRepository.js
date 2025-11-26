const { dbPool } = require("../db");

class AbstractRepository {
    constructor() {
        this.pool = dbPool; // Initialise la connexion à la base de données
    }

    async getClient() {
        return await this.pool.connect(); // Retourne un client de connexion
    }
}

module.exports = AbstractRepository;
