const { sequelize } = require("../db-connect");
const User = require('../models/user-model')(sequelize);

class UserService {
    async createUser({firstName, lastName}) {
       return await User.create({ firstName, lastName });
    }
    async getAllUsers() {
        return await User.findAll()
    }
    async getUserById(userId) {
        return await User.findOne({ where: { id: userId }});
    }
}

module.exports = new UserService();
