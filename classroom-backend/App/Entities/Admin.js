const User = require("./user.js");

class Admin extends User {
    constructor(data) {
        super(data);
        this.role = "admin";
    }
}

module.exports = Admin;