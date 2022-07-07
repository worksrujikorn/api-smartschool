module.exports = (sequelize, Sequelize) => {
    const t_master_assess = sequelize.define("t_master_assess", {
        assess_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        assess_code: {
            type: Sequelize.INTEGER(2)
        },

        assess_name: {
            type: Sequelize.STRING(50)
        },
        assess_group_id: {
            type: Sequelize.INTEGER(2)
        },
        createdate: {
            type: Sequelize.DATE
        },
        who: {
            type: Sequelize.STRING(100)
        },
       

    });
    return t_master_assess;
};