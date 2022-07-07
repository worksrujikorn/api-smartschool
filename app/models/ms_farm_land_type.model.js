module.exports = (sequelize, Sequelize) => {
    const ms_farm_land_type = sequelize.define("ms_farm_land_type", {
        ms_farm_land_type_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ms_farm_land_type: {
            type: Sequelize.STRING(100)
        },

      
       
    });
    return ms_farm_land_type;
};