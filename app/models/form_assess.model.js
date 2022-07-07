module.exports = (sequelize, Sequelize) => {
    const form_assess = sequelize.define("form_assess", {
        form_assess_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        form_code: {
            type: Sequelize.STRING(7)
        },

        form_name: {
            type: Sequelize.STRING(50)
        },
        form_role: {
            type: Sequelize.INTEGER(2)
        },
        createdate: {
            type: Sequelize.DATE
        },
        who: {
            type: Sequelize.STRING(100)
        },
       
    });
    return form_assess;
};