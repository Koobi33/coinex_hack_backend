const { sequelize } = require("../db-connect");
const User = require('../models/user-model')(sequelize);

class UserService {
    async createUser({firstName, lastName}) {
       return await User.create({ firstName, lastName });
    }
    async getAllUsers() {
        return await User.findAll()
    }
    async getUserByWallet(wallet) {
        return await User
            .findOrCreate({
                where: { wallet },
                defaults: {
                    nonce: Math.floor(Math.random() * 1000000)
                }
        });
    }
}

module.exports = new UserService();
