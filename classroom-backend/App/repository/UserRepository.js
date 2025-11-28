const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
    constructor() {
        super(); // Appelle le constructeur de la classe parente
    }

    async findAllUsers() {
        const client = await this.getClient(); // Initalise un client de connexion

        try {
            const res = await client.query(
                "SELECT id_users,firstname,lastname,pseudo,email,password,profile_picture,status,name_role FROM users JOIN role ON users.id_role = role.id_role"
            );
            return res.rows;
        } catch (err) {
            console.error("Erreur de requête", err.stack);
        } finally {
            client.release(); // Libère le client de connexion
        }
    }

    async findUserByEmail(email) {
        const client = await this.getClient();
        try {
            const query = `SELECT id_users,firstname,lastname,pseudo,email,password,profile_picture,status,name_role FROM users JOIN role ON users.id_role = role.id_role WHERE email = $1`;
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

    async isUserExistsByEmail(email) {
        const client = await this.getClient();
        try {
            const query = `SELECT id_users FROM users WHERE email = $1 `;
            const values = [email];
            const res = await client.query(query, values);
            if (res.rows.length > 0) {
                return true;
            }
            return false;
        } catch (err) {
            console.error("Erreur de requête", err.stack);
            throw err;
        } finally {
            client.release();
        }
    }

    async findAllByRole(role) {
        const client = await this.getClient();
        try {
            const query = `SELECT firstname,lastname,pseudo,email,profile_picture,status,name_role FROM users JOIN role ON users.id_role = role.id_role WHERE role = $1`;
            const values = [role];
            const res = await client.query(query, values);
            return res.rows[0];
        } catch (err) {
            console.error("Erreur de requête", err.stack);
            throw err;
        } finally {
            client.release();
        }
    }

    async saveUser(user) {
        const client = await this.getClient();
        try {
            const query = `
            WITH inserted AS (
                INSERT INTO users (firstname, lastname, pseudo, email, password, profile_picture, status, id_role)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *
            )
            SELECT 
                inserted.id_users,
                inserted.firstname,
                inserted.lastname,
                inserted.pseudo,
                inserted.email,
                inserted.password,
                inserted.profile_picture,
                inserted.status,
                role.name_role
            FROM inserted
            JOIN role ON inserted.id_role = role.id_role;
        `;

            const values = [
                user.firstname,
                user.lastname,
                user.pseudo,
                user.email,
                user.password,
                user.imgProfile,
                user.status,
                user.role === "admin" ? 1 : 2,
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

    async modifyUser(user) {
        const client = await this.getClient();
        try {
            const query = `UPDATE USERS SET lastname=$1,firstname=$2,pseudo=$3,email=$4,profile_picture=$5`;
            const values = [
                user.lastname,
                user.firstname,
                user.pseudo,
                user.pseudo,
                user.email,
                user.imgProfile,
            ];
            await client.query(query, values);
        } catch (err) {
            console.error("Erreur de requête", err.stack);
        }
    }
}

module.exports = new UserRepository();
