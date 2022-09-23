const { User } = require("../db-connect");

class UserService {
    async createUser(name) {
        await User.create({ firstName: name, lastName: name })
    }
    async getAllUsers() {
        return await User.findAll()
    }
}

module.exports = new UserService();
