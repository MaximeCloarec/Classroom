const userRepository = require("../repository/UserRepository");
const User = require("../Entities/user");
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

        const existingUser = await this.userRepository.findByEmail(
            newUser.email
        );
        if (existingUser) {
            throw new Error("Email déjà utilisé");
        }

        const hashedPassword = await this.hashPassword(newUser.password);
        newUser.password = hashedPassword;

        return this.userRepository.createUser(newUser);
    }

    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Mot de passe incorrect");
        }
        delete user.password;
        return user;
    }

    async deleteUser(email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }
        return this.userRepository.deleteUser(user.id_users);
    }
}

module.exports = new UserService();
