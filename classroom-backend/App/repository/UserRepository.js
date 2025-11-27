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

    async findByEmail(email) {
        const client = await this.getClient();
        try {
            const query = `SELECT id_users,firstname,lastname,pseudo,email,password,profile_picture,status FROM users WHERE email = $1`;
            const values = [email];
            const res = await client.query(query, values);
            return res.rows[0];
        } catch (err) {
            console.error("Erreur de requête", err.stack);
            throw err;
        } finally {
            client.release();
        }
    }

    async createUser(user) {
        const client = await this.getClient();
        try {
            const query = `
                INSERT INTO users (firstname, lastname, pseudo, email, password, profile_picture, status)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *`;
            const values = [
                user.firstname,
                user.lastname,
                user.pseudo,
                user.email,
                user.password,
                user.imgProfile,
                user.status,
            ];
            const res = await client.query(query, values);
            return res.rows[0];
        } catch (err) {
            console.error("Erreur de requête", err.stack);
            throw err;
        } finally {
            client.release();
        }
    }

    async deleteUser(id) {
        const client = await this.getClient();
        try {
            const query = `DELETE FROM users WHERE id_users = $1`;
            const values = [id];
            await client.query(query, values);
        } catch (err) {
            console.error("Erreur de requête", err.stack);
            throw err;
        } finally {
            client.release();
        }
    }
}

module.exports = new UserRepository();
