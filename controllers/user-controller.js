const UserService = require("../service/user-service");
const CourseService = require("../service/course-service");
const ContractService = require("../service/contract-service");
const { COURSE_STATUSES } = require("../constants");

class UserController {
  async getAllUsers(req, res, next) {
    const allUsers = await UserService.getAllUsers();

    res.send(`All users: ${JSON.stringify(allUsers)}`);
  }
  async getUserById(req, res, next) {
    const userId = req.params.id;
    const myUser = await UserService.getUserByWallet(userId);
    if (!myUser) {
      res.send(`User with id ${userId} not found`);
    }
    res.json(myUser);
  }
  async registerUserOnCourse(req, res, next) {
    const userId = req.params.id;
    const courseID = req.params.courseID;
    let user = await UserService.getUserByWallet(userId);
    const course = await CourseService.getCourseById(courseID);

    if (user && course) {
      const startedCourses = JSON.parse(user.startedCourses);
      user = await UserService.updateUser({
        wallet: userId,
        startedCourses: {
          ...startedCourses,
          [courseID]: {
            currentLesson: course.lessons[0].id,
            status: "IN_PROGRESS",
            evaluationsCompleted: 0,
          },
        },
      });
    }
    return res.json(user);
  }
  async updateUserStatusOnCourse(req, res, next) {
    // отправляем id урока +1
    const userId = req.params.id;
    const courseID = req.params.courseID;
    const lessonID = req.params.lessonID;
    let user = await UserService.getUserByWallet(userId);
    const course = await CourseService.getCourseById(courseID);
    const isFinished =
      lessonID >= course.lessons[course.lessons.length - 1].id + 1;
    const startedCourses = user.startedCourses;
    if (user && course && startedCourses[courseID]) {
      if (course.lessons[startedCourses[courseID].currentLesson]) {
        await ContractService.grantUser(
          userId,
          course.lessons[startedCourses[courseID].currentLesson].reward
        );
      }
      user = await UserService.updateUser({
        wallet: userId,
        level: user.level + 0.55,
        startedCourses: {
          ...startedCourses,
          [courseID]: {
            ...startedCourses[courseID],
            status: isFinished
              ? COURSE_STATUSES.EVALUATION
              : COURSE_STATUSES.IN_PROGRESS,
            currentLesson: lessonID,
          },
        },
      });
      return res.json(user);
    }
  }
}

module.exports = new UserController();
