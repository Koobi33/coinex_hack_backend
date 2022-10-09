const CourseService = require("../service/course-service");
const UserService = require("../service/user-service");
const ContractService = require("../service/contract-service");
const { COURSE_STATUSES } = require("../constants");

class CourseController {
  async getAllCourses(req, res, next) {
    const allCourses = await CourseService.getAllCourses();
    res.json(allCourses);
  }
  async getEvaluatableCourses(req, res, next) {
    const allUsers = await UserService.getAllUsers();
    const availableCourses = allUsers.map((user) => {
      const startedCourses =
        typeof user.startedCourses === "string" || !user.startedCourses
          ? []
          : Object.entries(user.startedCourses);
      const userCoursesList = startedCourses.filter(
        (userCourse) => userCourse[1].status === COURSE_STATUSES.EVALUATION
      );
      return userCoursesList.map((item) => ({
        user: user.wallet,
        course: item,
      }));
    });
    return res.json(availableCourses.flat(1));
  }
  async evaluateCourse(req, res, next) {
    const evaluatorID = req.params.evaluatorID;
    const userID = req.params.userID;
    const courseID = req.params.courseID;
    let user = await UserService.getUserByWallet(userID);
    let evaluator = await UserService.getUserByWallet(evaluatorID);
    const course = await CourseService.getCourseById(courseID);
    if (
      user &&
      course &&
      evaluator &&
      user.startedCourses[courseID] &&
      user.startedCourses[courseID].status === COURSE_STATUSES.EVALUATION
    ) {
      await ContractService.grantUser(evaluatorID, 50);
      user = await UserService.updateUser({
        wallet: userID,
        startedCourses: {
          ...user.startedCourses,
          [courseID]: {
            ...user.startedCourses[courseID],
            status:
              user.startedCourses[courseID].evaluationsCompleted + 1 >=
              course.evaluationsNeeded
                ? COURSE_STATUSES.FINISHED
                : COURSE_STATUSES.EVALUATION,
            evaluationsCompleted:
              user.startedCourses[courseID].evaluationsCompleted + 1,
          },
        },
      });
      // if (user.startedCourses[courseID].evaluationsCompleted + 1 >= course.evaluationsNeeded)
      // выдать нфт (???)
    }
    return res.json(user);
  }
  async getCourseById(req, res, next) {
    const courseID = req.params.id;
    const course = await CourseService.getCourseById(courseID);
    if (!course) {
      res.send(`Course with id ${courseID} not found`);
    }
    res.json(course);
  }

  async createCourse(req, res, next) {
    const {
      title,
      description,
      reward,
      lessons,
      skills,
      specializationDescription,
      evaluationsNeeded,
    } = req.body;

    const newCourseRaw = await CourseService.createCourse({
      title,
      description,
      reward,
      lessons,
      skills,
      specializationDescription,
      evaluationsNeeded,
    });
    const newCourse = newCourseRaw.toJSON();
    return res.json(newCourse);
  }
  async deleteCourse(req, res, next) {
    const courseID = req.params.id;
    await CourseService.deleteCourse(courseID);
    return res.status(200).send();
  }
}

module.exports = new CourseController();
