const userRepository = require("../repository/UserRepository");
const User = require("../Entities/user");

class UserService {
    constructor() {
        this.userRepository = userRepository;
    }
    async getAllUsers() {
        return await this.userRepository.findAllUsers();
    }

    async register(userData) {
        try {
            const user = new User(userData);
            await this.userRepository
                .findByEmail(user.email)
                .then((existingUser) => {
                    if (existingUser) {
                        throw new Error("Email déja utilisé");
                    }
                });
            return await this.userRepository.createUser(user);
        } catch (err) {
            throw new Error("Invalid user data: " + err.message);
        }
    }
}

module.exports = new UserService();
