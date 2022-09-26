const Router = require('express').Router;
const UserController = require('../controllers/user-controller');

const router = new Router();

//get all users
router.get('/users', UserController.getAllUsers);

//get specific user by id
router.get('/users/:id', UserController.getUserById);

router.post('/users', UserController.createUser);

router.put('/users', UserController.createUser);

router.delete('/users', UserController.createUser);

// router.post('/test', async (req, res) => {
//
//     console.log(req.body);
//
//     res.status(200);
//     res.send(`${JSON.stringify(req.body)}`);
// })

module.exports = router;
