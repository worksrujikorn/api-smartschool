module.exports = (sequelize, Sequelize) => {
    const checkin_classroom = sequelize.define("checkin_classroom", {
        checkin_classroom_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        checkin_classroom_code: {
            type: Sequelize.STRING(7)
        },
        student_code: {
            type: Sequelize.STRING(7)
        },
        datetime: {
            type: Sequelize.DATE
        },
        teacher_code	: {
            type: Sequelize.STRING(7)
        },
        schedule_code: {
            type: Sequelize.STRING(7)
        },
        detail: {
            type: Sequelize.STRING(100)
        },  
    });
    return checkin_classroom;
};