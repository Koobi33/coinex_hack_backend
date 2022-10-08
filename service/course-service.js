const { sequelize } = require("../db-connect");
const Course = require("../models/course-model")(sequelize);

class CourseService {
  async getAllCourses() {
    return await Course.findAll();
  }
  async getCourseById(courseID) {
    return await Course.findOne({ where: { id: courseID } });
  }
  async createCourse({
    title,
    description,
    reward,
    lessons,
    skills,
    specializationDescription,
    evaluationsNeeded,
  }) {
    return await Course.create({
      title,
      description,
      reward,
      lessons,
      skills,
      specializationDescription,
      evaluationsNeeded,
    });
  }
  async deleteCourse(courseID) {
    const course = await this.getCourseById(courseID);
    await course.destroy();
  }
}

module.exports = new CourseService();
