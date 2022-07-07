module.exports = (sequelize, Sequelize) => {
    const t_group_assess = sequelize.define("t_group_assess", {
        group_assess_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        assess_group_code: {
            type: Sequelize.INTEGER(2)
        },

        assess_group_name: {
            type: Sequelize.STRING(50)
        },
        createdate: {
            type: Sequelize.DATE
        },
        who: {
            type: Sequelize.STRING(100)
        },
       

    });
    return t_group_assess;
};