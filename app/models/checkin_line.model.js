module.exports = (sequelize, Sequelize) => {
    const checkin_line = sequelize.define("checkin_line", {
        checkin_line_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        chechkin_line_code	: {
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
       
    });
    return checkin_line;
};