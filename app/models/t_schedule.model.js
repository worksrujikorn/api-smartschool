module.exports = (sequelize, Sequelize) => {
    const t_schedule = sequelize.define("t_schedule", {
        schedule_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        schedule_code : {
            type: Sequelize.STRING(7)
        },
        subject_code: {
            type: Sequelize.STRING(7)
        },
        teacher_code: {
            type: Sequelize.STRING(7)
        },
        room_code: {
            type: Sequelize.STRING(7)
        },
        date: {
            type: Sequelize.STRING(10)
        },
        hours: {
            type: Sequelize.INTEGER(3)
        },
        period: {
            type: Sequelize.STRING(15)
        },
        classroom_code: {
            type: Sequelize.STRING(7)
        },
        year: {
            type: Sequelize.INTEGER(5)
        },
        detail: {
            type: Sequelize.STRING(500)
        },
        createdate: {
            type: Sequelize.DATE
        },
        who: {
            type: Sequelize.STRING(100)
        },
       
    });
    return t_schedule;
};