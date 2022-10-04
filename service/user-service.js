const { sequelize } = require("../db-connect");
const { generateNonce } = require("../utils");
const User = require("../models/user-model")(sequelize);

class UserService {
  async createUser({ wallet }) {
    return await User.create({
      wallet,
      nonce: generateNonce(),
    });
  }
  async getAllUsers() {
    return await User.findAll();
  }
  async getUserByWallet(wallet) {
    return await User.findOne({ where: { wallet } });
  }
  async updateUser({ wallet, nonce, firstName = null, lastName = null }) {
    const user = await this.getUserByWallet(wallet);
    if (user) {
      user.set({
        nonce,
        // firstName,
        // lastName,
      });
      await user.save();
    }
    return user;
  }
}

module.exports = new UserService();
