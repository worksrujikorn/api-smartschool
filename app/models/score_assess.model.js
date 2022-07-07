module.exports = (sequelize, Sequelize) => {
    const score_assess = sequelize.define("score_assess", {
        score_assess_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        score_code: {
            type: Sequelize.INTEGER(3)
        },

        form_assess_list_code: {
            type: Sequelize.STRING(7)
        },
        assess_choice: {
            type: Sequelize.STRING(50)
        },
        score: {
            type: Sequelize.INTEGER(2)
        },
        createdate: {
            type: Sequelize.DATE
        },
        who: {
            type: Sequelize.STRING(100)
        },
       
    });
    return score_assess;
};