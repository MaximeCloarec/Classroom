class User {
    constructor(data) {
        // this.assertNumber(data.id, "id");
        this.assertString(data.firstname, "firstname");
        this.assertString(data.lastname, "lastname");
        this.assertString(data.pseudo,"pseudo")
        this.assertEmail(data.email, "email");
        this.assertString(data.password, "password");
        this.assertOptionalURL(data.imgProfile, "imgProfile");
        this.status = true;

        Object.assign(this, data);
    }

    assertString(value, field) {
        if (typeof value !== "string") {
            throw new Error(`${field} must be a string`);
        }
    }

    assertNumber(value, field) {
        if (typeof value !== "number") {
            throw new Error(`${field} must be a number`);
        }
    }

    assertEmail(value, field) {
        this.assertString(value, field);
        if (!value.includes("@")) {
            throw new Error(`${field} must be a valid email`);
        }
    }

    assertOptionalURL(value, field) {
        if (value === null || value === undefined) return;
        try {
            new URL(value);
        } catch {
            throw new Error(`${field} must be a valid URL or null`);
        }
    }
}

module.exports = User;
