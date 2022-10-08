const { sequelize } = require("../db-connect");
const User = require("../models/user-model")(sequelize);

class UserService {
  async createUser({ wallet }) {
    return await User.create({
      wallet,
    });
  }
  async getAllUsers() {
    return await User.findAll();
  }
  async getUserByWallet(wallet) {
    return await User.findOne({ where: { wallet } });
  }
  async updateUser({ wallet, nonce, startedCourses, level }) {
    const user = await this.getUserByWallet(wallet);
    if (user) {
      if (nonce) {
        user.nonce = nonce;
        await user.save();
      }

      if (startedCourses) {
        user.startedCourses = startedCourses;
        await user.save();
      }

      if (level && typeof level === "number") {
        user.level = level;
        await user.save();
      }
    }
    return user;
  }
}

module.exports = new UserService();
