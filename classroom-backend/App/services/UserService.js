const userRepository = require("../repository/UserRepository");

class UserService {
    constructor() {
        this.userRepository = userRepository;
    }
    async getAllUsers() {
        return await this.userRepository.findAllUsers();
    }
}

module.exports = new UserService();
