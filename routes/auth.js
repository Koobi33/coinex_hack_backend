const Router = require("express").Router;
const AuthController = require("../controllers/auth-controller");

const router = new Router();

router.get("/:wallet/nonce", AuthController.getNonce);
router.post("/:wallet/signature", AuthController.validateSignature);

module.exports = router;
