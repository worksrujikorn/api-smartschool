module.exports = (sequelize, Sequelize) => {
    const t_master_category = sequelize.define("t_master_category", {
        category_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        category_code: {
            type: Sequelize.INTEGER(3)
        },

        category_name: {
            type: Sequelize.STRING(100)
        },
        category_group: {
            type: Sequelize.STRING(100)
        },
        createdate: {
            type: Sequelize.DATE
        },
        who: {
            type: Sequelize.STRING(100)
        },
       

    });
    return t_master_category;
};