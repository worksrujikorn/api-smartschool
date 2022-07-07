module.exports = (sequelize, Sequelize) => {
    const t_comment = sequelize.define("t_comment", {
        comment_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        comment_code: {
            type: Sequelize.STRING(7)
        },

        comment_detail: {
            type: Sequelize.STRING(100)
        },
        student_code: {
            type: Sequelize.STRING(7)
        },
        datetime: {
            type: Sequelize.DATE
        },
        teacher_code: {
            type: Sequelize.STRING(7)
        },
       

    });
    return t_comment;
};