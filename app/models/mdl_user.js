
const dbConfig_moodle = require("../config/db_moodle.config.js");
const Sequelize = require("sequelize");
// connect Database ของ Sequelize

const sequelize_moodle = new Sequelize(dbConfig_moodle.DB, dbConfig_moodle.USER, dbConfig_moodle.PASSWORD, {
  host: dbConfig_moodle.HOST,
  dialect: dbConfig_moodle.dialect,
  define: {
    freezeTableName: true,
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
  },
  operatorsAliases: false,
  pool: {
    max: dbConfig_moodle.pool.max,
    min: dbConfig_moodle.pool.min,
    acquire: dbConfig_moodle.pool.acquire,
    idle: dbConfig_moodle.pool.idle
  }
});

const db_moodle = {};
db_moodle.Sequelize = Sequelize;
db_moodle.sequelize = sequelize_moodle;



module.exports = db_moodle;