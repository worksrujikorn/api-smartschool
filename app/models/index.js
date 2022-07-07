const dbConfig = require("../config/db.config.js");
const dbConfig_moodle = require("../config/db_moodle.config.js");
const Sequelize = require("sequelize");
// connect Database ของ Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  define: {
    freezeTableName: true,
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
  },
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

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

//เรียก Model 
db.assess_recorder = require("./assess_recorder.model")(sequelize, Sequelize);
db.assess_recorder_list = require("./assess_recorder_list.model")(sequelize, Sequelize);
db.behaviour_score = require("./behaviour_score.model")(sequelize, Sequelize);
db.checkin_classroom = require("./checkin_classroom.model")(sequelize, Sequelize);
db.checkin_facescan = require("./checkin_facescan.model")(sequelize, Sequelize);
db.checkin_line = require("./checkin_line.model")(sequelize, Sequelize);
db.checkin_teach = require("./checkin_teach.model")(sequelize, Sequelize);
db.form_assess = require("./form_assess.model")(sequelize, Sequelize);
db.form_assess_list = require("./form_assess_list.model")(sequelize, Sequelize);
db.score_assess = require("./score_assess.model")(sequelize, Sequelize);
db.t_comment = require("./t_comment.model")(sequelize, Sequelize);
db.t_group_assess = require("./t_group_assess.model")(sequelize, Sequelize);
db.t_leave = require("./t_leave.model")(sequelize, Sequelize);
db.t_master_assess = require("./t_master_assess.model")(sequelize, Sequelize);
db.t_master_category = require("./t_master_category.model")(sequelize, Sequelize);
db.t_master_classroom = require("./t_master_classroom.model")(sequelize, Sequelize);
db.t_master_facescan = require("./t_master_facescan.model")(sequelize, Sequelize);
db.t_master_group = require("./t_master_group.model")(sequelize, Sequelize);
db.t_master_parent = require("./t_master_parent.model")(sequelize, Sequelize);
db.t_master_room = require("./t_master_room.model")(sequelize, Sequelize);
db.t_master_student = require("./t_master_student.model")(sequelize, Sequelize);
db.t_master_subject = require("./t_master_subject.model")(sequelize, Sequelize);
db.t_master_teacher = require("./t_master_teacher.model")(sequelize, Sequelize);
db.t_news = require("./t_news.model")(sequelize, Sequelize);
db.t_schedule = require("./t_schedule.model")(sequelize, Sequelize);
db.t_login = require("./t_login.model")(sequelize, Sequelize);
db.t_master_role = require("./t_master_role.model")(sequelize, Sequelize);
db.t_master_ip_facescan = require("./t_master_ip_facescan.model")(sequelize, Sequelize);
db.t_master_time_checkin = require("./t_master_time_checkin.model")(sequelize, Sequelize);
db.t_notification = require("./t_notification.model")(sequelize, Sequelize);
db.t_master_behaviour = require("./t_master_behaviour.model")(sequelize, Sequelize);
db.t_master_school_year = require("./t_master_school_year.model")(sequelize, Sequelize);
db.t_master_school_color = require("./t_master_school_color.model")(sequelize, Sequelize);
db.t_master_school = require("./t_master_school.model")(sequelize, Sequelize);
db.t_home_visit = require("./t_home_visit.model")(sequelize, Sequelize);




db.ms_attached_photos = require("./ms_attached_photos.model")(sequelize, Sequelize);
db.ms_com_internet = require("./ms_com_internet.model")(sequelize, Sequelize);
db.ms_dependency = require("./ms_dependency.model")(sequelize, Sequelize);
db.ms_electronic_comm = require("./ms_electronic_comm.model")(sequelize, Sequelize);
db.ms_farm_land_type = require("./ms_farm_land_type.model")(sequelize, Sequelize);
db.ms_fm_marital_status = require("./ms_fm_marital_status.model")(sequelize, Sequelize);
db.ms_game_addiction = require("./ms_game_addiction.model")(sequelize, Sequelize);
db.ms_health = require("./ms_health.model")(sequelize, Sequelize);
db.ms_hobbies = require("./ms_hobbies.model")(sequelize, Sequelize);
db.ms_housing_envir = require("./ms_housing_envir.model")(sequelize, Sequelize);
db.ms_housing_type = require("./ms_housing_type.model")(sequelize, Sequelize);
db.ms_informant = require("./ms_informant.model")(sequelize, Sequelize);
db.ms_journey = require("./ms_journey.model")(sequelize, Sequelize);
db.ms_parents_leave_child_with_someone = require("./ms_parents_leave_child_with_someone.model")(sequelize, Sequelize);
db.ms_relatoinship_family = require("./ms_relatoinship_family.model")(sequelize, Sequelize);
db.ms_sexual = require("./ms_sexual.model")(sequelize, Sequelize);
db.ms_substance_abuse = require("./ms_substance_abuse.model")(sequelize, Sequelize);
db.ms_vehicle = require("./ms_vehicle.model")(sequelize, Sequelize);
db.ms_violent = require("./ms_violent.model")(sequelize, Sequelize);
db.ms_want_school_help = require("./ms_want_school_help.model")(sequelize, Sequelize);
db.ms_welfare_safety = require("./ms_welfare_safety.model")(sequelize, Sequelize);
db.ms_work_responsibility = require("./ms_work_responsibility.model")(sequelize, Sequelize);


// ทดสอบ
db.test_test = require("./test.model")(sequelize, Sequelize);

// db_moodle.mdl_user = require("./mdl_user.model")(sequelize_moodle, Sequelize);



// db.t_master_role.belongsToMany(db.t_login, {
//   through: "role_id", 
//   foreignKey: "roleId",
//   otherKey: "userId"
// });
// db.t_login.belongsToMany(db.t_master_role, {
//   through: "role_id", 
//   foreignKey: "userId",
//   otherKey: "roleId"


// });
// db.ROLES = ["admin" , "director","teacher", "student","parent"];


// db.user = require("../models/user.model.js")(sequelize, Sequelize);
// db.role = require("../models/role.model.js")(sequelize, Sequelize);
// db.role.belongsToMany(db.user, {
//   through: "user_roles",
//   foreignKey: "roleId",
//   otherKey: "userId"
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId"
// });
// db.ROLES = ["user", "admin", "moderator"];

module.exports = db;