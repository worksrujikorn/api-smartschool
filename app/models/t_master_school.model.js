module.exports = (sequelize, Sequelize) => {
    const t_master_school = sequelize.define("t_master_school", {
        school_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        school_code : {
            type: Sequelize.STRING(7)
        },
        school_name: {
            type: Sequelize.STRING(50)
        },
        createdate: {
            type: Sequelize.DATE
        },
        who: {
            type: Sequelize.STRING(100)
        }
    });
    return t_master_school;
};