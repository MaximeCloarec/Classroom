const AbstractRepository = require("./AbstractRepository");

class LessonRepository extends AbstractRepository {
    constructor() {
        super(); // Appelle le constructeur de la classe parente
    }

    async findByTitle(title) {
        const client = await this.getClient();
        try {
            const query = `SELECT id_classes,title,content,img_classes FROM classes WHERE title = $1`;
            const values = [title];
            const res = await client.query(query, values);
            return res.rows[0];
        } catch (err) {
            console.error("Erreur de requête", err.stack);
            throw err;
        } finally {
            client.release();
        }
    }

    async findAllLessons() {
        const client = await this.getClient(); // Initalise un client de connexion

        try {
            const res = await client.query("SELECT * FROM classes");
            return res.rows;
        } catch (err) {
            console.error("Erreur de requête", err.stack);
        } finally {
            client.release(); // Libère le client de connexion
        }
    }

    async createLesson(lesson) {
        const client = await this.getClient();
        try {
            const query = `
                INSERT INTO classes (title, content, img_classes)
                VALUES ($1, $2, $3)
                RETURNING *`;
            const values = [
                lesson.title,
                lesson.content,
                lesson.img
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

    async deleteLesson(id) {
        const client = await this.getClient();
        try {
            const query = `DELETE FROM classes WHERE id_classes = $1`;
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

module.exports = new LessonRepository();
