module.exports = (sequelize, Sequelize) => {
    const ms_housing_envir = sequelize.define("ms_housing_envir", {
        ms_housing_envir_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ms_housing_envir: {
            type: Sequelize.STRING(100)
        },

      
       
    });
    return ms_housing_envir;
};