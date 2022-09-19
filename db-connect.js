const pg = require('pg');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(`postgres://postgres:postgres@db:5432/postgres`, {
    dialectModule: pg
});

const User = sequelize.define(
    'User',
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,

        },
    }
)


async function connectDataBase() {
    await sequelize.authenticate();
    await User.sync();
}

module.exports = {
    sequelize,
    User,
    connectDataBase
}
