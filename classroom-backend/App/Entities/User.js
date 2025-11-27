class User {
    constructor(data) {
        // this.assertNumber(data.id, "id");
        this.assertString(data.firstname, "firstname");
        this.assertString(data.lastname, "lastname");
        this.assertString(data.pseudo, "pseudo");
        this.assertEmail(data.email, "email");
        this.assertString(data.password, "password");
        this.assertOptionalURL(data.imgProfile, "imgProfile");
        this.status = true;
        this.role = data.role || "stagiaire";

        Object.assign(this, data);

        // Faire en sorte que le mot de passe ne soit pas envoyé en front-end
        if (this.password !== undefined) {
            Object.defineProperty(this, "password", {
                enumerable: false,
                writable: true,
                configurable: true,
            });
        }
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
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
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
