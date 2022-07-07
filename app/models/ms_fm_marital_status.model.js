module.exports = (sequelize, Sequelize) => {
    const ms_fm_marital_status = sequelize.define("ms_fm_marital_status", {
        ms_fm_marital_status_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ms_fm_marital_status: {
            type: Sequelize.STRING(100)
        },

      
       
    });
    return ms_fm_marital_status;
};