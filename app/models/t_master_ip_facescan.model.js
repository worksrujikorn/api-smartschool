module.exports = (sequelize, Sequelize) => {
    const t_master_ip_facescan = sequelize.define("t_master_ip_facescan", {
        ip_facescan_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        ip : {
            type: Sequelize.STRING(20)
        },
        serial_number: {
            type: Sequelize.STRING(50)
        },
        name_facescan: {
            type: Sequelize.STRING(50)
        },
        createdate: {
            type: Sequelize.DATE
        },
        who: {
            type: Sequelize.STRING(100)
        },
        name_school: {
            type: Sequelize.STRING(100)
        },
       
    });
    return t_master_ip_facescan;
};