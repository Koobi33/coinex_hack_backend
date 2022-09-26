const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const User = sequelize.define("User", {
            firstName: {
                type: DataTypes.STRING,
            },
            lastName: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: true,
        });
    return User;
};


