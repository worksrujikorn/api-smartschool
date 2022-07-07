module.exports = (sequelize, Sequelize) => {
    const t_master_facescan = sequelize.define("t_master_facescan", {
        facescan_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        facescan_code	: {
            type: Sequelize.STRING(7)
        },

        firstname: {
            type: Sequelize.STRING(250)
        },
        lastname: {
            type: Sequelize.STRING(250)
        },
        picture: {
            type: Sequelize.STRING(50)
        },
        createdate: {
            type: Sequelize.DATE
        },
        who: {
            type: Sequelize.STRING(100)
        },
       

    });
    return t_master_facescan;
};