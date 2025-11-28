class Lesson {
    constructor(data) {
        // this.assertNumber(data.id, "id");
        this.assertString(data.title, "title");
        this.assertString(data.content, "content");
        this.assertString(data.imgLesson,"imgLesson")

        Object.assign(this, data);
    }

    assertString(value, field) {
        if (typeof value !== "string") {
            throw new Error(`${field} must be a string`);
        }
    }
}

module.exports = Lesson;
