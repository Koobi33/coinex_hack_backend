const { sequelize } = require("../db-connect");
const User = require('../models/user-model')(sequelize);

class UserService {
    async createUser({ wallet }) {
       return await User
           .create({
               wallet,
               nonce: Math.floor(Math.random() * 1000000)
           });
    }
    async getAllUsers() {
        return await User.findAll()
    }
    async getUserByWallet(wallet) {
        return await User.findOne({ where: { wallet }});
    }
}

module.exports = new UserService();
