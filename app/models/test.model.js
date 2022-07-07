module.exports = (sequelize, Sequelize) => {
    const test = sequelize.define("test_test", {
        test_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        recorder_code: {
            type: Sequelize.STRING(7)
        },
        student_code:{
            type: Sequelize.STRING(7)
        },
        assess_time:{
            type: Sequelize.DATE()
        },
        recorder:{
            type:Sequelize.STRING(13)
        },
        detail:{
            type:Sequelize.JSON()
        },
       
    });
    return test;
};