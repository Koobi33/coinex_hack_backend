const Router = require("express").Router;
const CourseController = require("../../controllers/course-controller");

const router = new Router();

// get all courses
router.get("/", CourseController.getAllCourses);

// get evaluatable courses
router.get("/evaluations", CourseController.getEvaluatableCourses);

// evaluate user course
router.post(
  "/evaluations/:evaluatorID/:userID/:courseID",
  CourseController.evaluateCourse
);

//create course
router.post("/", CourseController.createCourse);

//get course by id
router.get("/:id", CourseController.getCourseById);

//delete course
router.delete("/:id", CourseController.deleteCourse);

module.exports = router;
