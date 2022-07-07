module.exports = (sequelize, Sequelize) => {
    const t_master_time_checkin = sequelize.define("t_master_time_checkin", {
 
        time_ckeck_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        time_check: {
            type: Sequelize.DATE
        },
        name_check: {
            type: Sequelize.STRING(50)
        },
     
        createdate: {
            type: Sequelize.DATE
        },
        who: {
            type: Sequelize.STRING(100)
        },
       

    });
    return t_master_time_checkin;
};