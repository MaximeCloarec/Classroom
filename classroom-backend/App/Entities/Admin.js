const User = require("./user.js");

class Admin extends User {
    constructor(data) {
        super(data);
        this.role = "admin";
    }

    async deleteAccount(emailSuppressor, emailToDelete) {
        const suppressor = await this.userRepository.findByEmail(
            emailSuppressor
        );
        if (!suppressor || suppressor.name_role !== "admin") {
            throw new Error(
                "Permission refusée : seul un admin peut supprimer un utilisateur"
            );
        }
        const user = await this.userRepository.findByEmail(emailToDelete);
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }
        return this.userRepository.deleteUser(user.id_users);
    }
}

module.exports = Admin;
