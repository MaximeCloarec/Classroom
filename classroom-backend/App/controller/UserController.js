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

    async register(req, res) {
        try {
            const newUser = await this.service.register(req.body);
            console.log(newUser);

            this.jsonResponse(res, newUser, 201);
        } catch (err) {
            console.error(err);
            this.jsonResponse(res, { error: err.message }, 400);
        }
    }

    async login(req, res) {
        try {
            const loggedUser = await this.service.login(
                req.body.email,
                req.body.password
            );
            this.jsonResponse(res, loggedUser, 200);
        } catch (err) {
            console.error(err);
            this.jsonResponse(res, { error: err.message }, 400);
        }
    }

    async deleteUser(req, res) {
        try {
            const res = await this.service.deleteUser(
                req.body.emailSuppressor,
                req.body.emailToDelete
            );
            this.jsonResponse(
                res,
                { message: "Utilisateur supprimé avec succès" },
                200
            );
        } catch (err) {
            console.error(err);
            this.jsonResponse(res, { error: err.message }, 400);
        }
    }

    async modifyUser(req, res) {
        try {
            const res = await this.service.modifyUser(req.body);
        } catch (err) {
            console.log(err);
            this.jsonResponse(res, { error: err.message }, 400);
        }
    }
}

module.exports = new UserController();
