const LessonRepository = require("../repository/LessonRepository");
const Lesson = require("../Entities/Lesson");

class LessonService {
    constructor() {
        this.LessonRepository = LessonRepository;
    }

    async getAllLessons() {
        return this.LessonRepository.findAllLessons();
    }

    async addLesson(LessonData) {
        const newLesson = new Lesson(LessonData);

        const existingLesson = await this.LessonRepository.findByTitle(
            newLesson.title
        );
        if (existingLesson) {
            throw new Error("Titre déjà utilisé");
        }

        return this.LessonRepository.createLesson(newLesson);
    }

    async deleteLesson(title) {
        const lesson = await this.LessonRepository.findByTitle(title);
        if (!lesson) {
            throw new Error("Leçon non trouvée");
        }
        return this.LessonRepository.deleteLesson(lesson.id_classes);
    }
}

module.exports = new LessonService();
