const Router = require('express').Router;
const AuthController = require('../controllers/auth-controller');

const router = new Router();

router.post('/:wallet/nonce', AuthController.getNonce);

module.exports = router;
