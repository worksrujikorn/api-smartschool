module.exports = (sequelize, Sequelize) => {
    const ms_housing_type = sequelize.define("ms_housing_type", {
        ms_housing_type_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ms_housing_type: {
            type: Sequelize.STRING(100)
        },

      
       
    });
    return ms_housing_type;
};