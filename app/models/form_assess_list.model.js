module.exports = (sequelize, Sequelize) => {
    const form_assess_list = sequelize.define("form_assess_list", {
        form_assess_list_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        form_assess_list_code: {
            type: Sequelize.STRING(7)
        },

        form_code: {
            type: Sequelize.STRING(7)
        },
        assess_code: {
            type: Sequelize.INTEGER(2)
        },
        createdate: {
            type: Sequelize.DATE
        },
        who: {
            type: Sequelize.STRING(100)
        },
       
    });
    return form_assess_list;
};