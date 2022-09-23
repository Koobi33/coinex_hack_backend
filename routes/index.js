const Router = require('express').Router;
const UserController = require('../controllers/user-controller');

const router = new Router();

router.get('/', UserController.getAllUsers);

router.get('/create', UserController.createUser);

// router.post('/test', async (req, res) => {
//
//     console.log(req.body);
//
//     res.status(200);
//     res.send(`${JSON.stringify(req.body)}`);
// })


module.exports = router;
