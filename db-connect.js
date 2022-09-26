const pg = require('pg');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(`postgres://postgres:postgres@db:5432/postgres`, {
    dialectModule: pg
});



async function connectDataBase() {
    await sequelize.authenticate();
}

module.exports = {
    sequelize,
    connectDataBase
}
