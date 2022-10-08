const Router = require("express").Router;
const UserController = require("../controllers/user-controller");
const courseRouter = require("./api/courses");
const usersRouter = require("./api/users");
const authMiddleware = require("../middlewares/auth");

const router = new Router();

router.use("/courses", courseRouter);
router.use("/users", usersRouter);

// example of closed route by auth
router.get("/auth-users", authMiddleware, UserController.getAllUsers);

module.exports = router;
