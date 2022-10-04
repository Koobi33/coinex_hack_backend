const Router = require("express").Router;
const UserController = require("../controllers/user-controller");
const authMiddleware = require('../middlewares/auth');

const router = new Router();

//get all users
router.get("/users", UserController.getAllUsers);

//get specific user by id
router.get("/users/:id", UserController.getUserById);

// example of closed route by auth
router.get("/auth-users", authMiddleware,  UserController.getAllUsers);

router.post("/users", UserController.createUser);

router.put("/users", UserController.createUser);

router.delete("/users", UserController.createUser);

module.exports = router;
