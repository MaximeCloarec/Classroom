const AbstractController = require("./AbstractController.js");
const UserService = require("../services/UserService.js");

class UserController extends AbstractController {
    constructor() {
        super(UserService);
    }
    async getAllUsers(req, res) {
        try {
            const users = await this.service.getAllUsers();
            this.jsonResponse(res, users);
        } catch (err) {
            console.error(err);
            this.jsonResponse(res, { error: "Erreur serveur" }, 500);
        }
    }
}

module.exports = new UserController();