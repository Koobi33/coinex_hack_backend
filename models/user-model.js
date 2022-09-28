const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const User = sequelize.define("User", {
            wallet: {
                type: DataTypes.STRING,
            },
            nonce: {
                type: DataTypes.INTEGER,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            timestamps: true,
            freezeTableName: true,
        });
    return User;
};


