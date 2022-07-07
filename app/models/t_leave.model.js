module.exports = (sequelize, Sequelize) => {
    const t_leave = sequelize.define("t_leave", {
        leave_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        leave_code: {
            type: Sequelize.STRING(7)
        },

        leave_type: {
            type: Sequelize.STRING(15)
        },
        leave_person: {
            type: Sequelize.STRING(7)
        },
        classroom_code: {
            type: Sequelize.STRING(7)
        },
        datetime: {
            type: Sequelize.DATE
        },
        leave_status: {
            type: Sequelize.INTEGER(2)
        },
        detail: {
            type: Sequelize.STRING(100)
        },
        approve_person: {
            type: Sequelize.STRING(7)
        },
        category_code: {
            type: Sequelize.INTEGER(3)
        },
        leave_from: {
            type: Sequelize.DATE
        },
        leave_to: {
            type: Sequelize.DATE
        },
        approve_date: {
            type: Sequelize.DATE
        },
       
       

    });
    return t_leave;
};