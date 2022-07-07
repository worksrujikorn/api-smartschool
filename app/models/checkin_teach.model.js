module.exports = (sequelize, Sequelize) => {
    const checkin_teach = sequelize.define("checkin_teach", {
        checkin_teach_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        chechkin_teach_code: {
            type: Sequelize.STRING(7)
        },

        teacher_code: {
            type: Sequelize.STRING(7)
        },
        datetime: {
            type: Sequelize.DATE
        },
        shedule_code: {
            type: Sequelize.STRING(7)
        },
        detail: {
            type: Sequelize.STRING(100)
        },
       
    });
    return checkin_teach;
};