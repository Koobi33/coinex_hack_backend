const UserService = require('../service/user-service');

class UserController {
    async getAllUsers(req, res, next) {

        const allUsers = await UserService.getAllUsers();

        res.send(`All users: ${JSON.stringify(allUsers)}`);
    }
    async getUserById(req, res, next) {
        const userId = req.params.id;
        const myUser = await UserService.getUserById(userId);
        if (!myUser) {
            res.send(`User with id ${userId} not found`);
        }
        res.json(myUser);
    }

    async createUser(req, res, next) {

        const { firstName, lastName } = req.body;

        if (
            firstName.length > 0 && typeof firstName === 'string' &&
            lastName.length > 0 && typeof lastName === 'string'
        ) {
            const newUserRaw = await UserService.createUser({firstName, lastName});
            const newUser = newUserRaw.toJSON();
            return res.send(`User ${newUser.firstName} ${newUser.lastName} with id: ${newUser.id} has been created`);
        }
        return res.send('User creation error');
    }
}

module.exports = new UserController();
