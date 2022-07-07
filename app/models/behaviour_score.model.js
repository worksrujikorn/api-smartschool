module.exports = (sequelize, Sequelize) => {
    const behaviour_score = sequelize.define("behaviour_score", {
        behaviour_score_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        score_code: {
            type: Sequelize.STRING(7)
        },
        behaviour: {
            type: Sequelize.STRING(7)
        },
        score_type: {
            type: Sequelize.STRING(2)
        },
        score_amount	: {
            type: Sequelize.INTEGER(11)
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
        detail: {
            type: Sequelize.STRING(100)
        },
       
    });
    return behaviour_score;
};