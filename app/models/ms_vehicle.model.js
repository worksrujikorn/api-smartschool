module.exports = (sequelize, Sequelize) => {
    const ms_vehicle = sequelize.define("ms_vehicle", {
        ms_vehicle_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ms_vehicle: {
            type: Sequelize.STRING(100)
        },

      
       
    });
    return ms_vehicle;
};