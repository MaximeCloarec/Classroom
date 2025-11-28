const userRepository = require("../repository/UserRepository");
const User = require("../Entities/user");
const Admin = require("../Entities/Admin");
const bcrypt = require("bcrypt");

class UserService {
    constructor() {
        this.userRepository = userRepository;
    }

    async getAllUsers() {
        return this.userRepository.findAllUsers();
    }

    async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }

    async register(userData) {
        const newUser = new User(userData);

        const existingUser = await this.userRepository.findUserByEmail(
            newUser.email
        );
        if (existingUser) {
            throw new Error("Email déjà utilisé");
        }

        const hashedPassword = await this.hashPassword(newUser.password);
        newUser.password = hashedPassword;
        newUser.role = "stagiaire";
        return this.userRepository.saveUser(newUser);
    }

    async login(email, password) {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Mot de passe incorrect");
        }
        const loggedUser = new User(user);
        return loggedUser;
    }

    async deleteUser(emailSuppressor, emailToDelete) {
        const adminData = await this.userRepository.findUserByEmail(
            emailSuppressor
        );
        if (!adminData) {
            throw new Error("Utilisateur admin non trouvé");
        }
        const admin = new Admin(adminData);
        const userToDelete = await this.userRepository.findUserByEmail(
            emailToDelete
        );
        if (!userToDelete) {
            throw new Error("Utilisateur à supprimer non trouvé");
        }
        return admin.deleteAccount(this.admin.email, emailToDelete);
    }

    async modifiyUser(newData) {
        const modifiedUser = new User(newData);

        const existingUser = await this.userRepository.findUserByEmail(
            modifiedUser.email
        );
        if (existingUser) {
            throw new Error("Le compte n'existe pas");
        }
        return this.userRepository.updateUser(modifiedUser);
    }
}

module.exports = new UserService();
