const Router = require("express").Router;
const UserController = require("../../controllers/user-controller");
const ContractController = require("../../controllers/contract-controller");
const router = new Router();

//get all users
router.get("/", UserController.getAllUsers);

//get specific user by id
router.get("/:id", UserController.getUserById);

//get user balance by id
router.get("/:id/tokens", ContractController.getUserBalance);

// register on course
router.post("/:id/:courseID/registration", UserController.registerUserOnCourse);

// update course progress
router.put("/:id/:courseID/:lessonID", UserController.updateUserStatusOnCourse);

// submit exam
router.post("/:id/:courseID/submit", UserController.submitExam);

module.exports = router;
