const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Course = sequelize.define(
    "Course",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      reward: {
        // {
        // nft: {
        //   id: string,
        //   img: string | BLOB,
        //   title: string,
        // },
        // tokens: number,
        // }
        type: DataTypes.JSON,
      },
      lessons: {
        // {
        //   id: number, по порядку
        //   title: string,
        //   description: string,
        //   img: string | BLOB,
        //   video: string,
        //   reward: number,
        // }
        type: DataTypes.JSON,
      },
      skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      specializationDescription: {
        type: DataTypes.STRING,
      },
      evaluationsNeeded: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );
  return Course;
};
