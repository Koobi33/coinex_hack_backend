const UserService = require('../service/user-service');

class UserController {
    async getAllUsers(req, res, next) {

        const allUsers = await UserService.getAllUsers();

        res.send(`All users: ${JSON.stringify(allUsers)}`);
    }

    async createUser(req, res, next) {

        const name = `User name #${Math.random()}`

        await UserService.createUser(name);
        res.send(`User ${name} has been created`);
    }
}

module.exports = new UserController();
