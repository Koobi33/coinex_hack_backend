const { DataTypes } = require("sequelize");
const { generateNonce } = require("../utils");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      wallet: {
        type: DataTypes.STRING,
      },
      nonce: {
        type: DataTypes.INTEGER,
        defaultValue: generateNonce(),
      },
      level: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      startedCourses: {
        //     {
        //         courseID: {
        //             status: string ("IN_PROGRESS" | "EVALUATION", "FINISHED"),
        //             currentLesson: number
        //             evaluationCompleted: number,
        //          }
        //     }

        type: DataTypes.JSON,
        defaultValue: "{}",
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );
  return User;
};
