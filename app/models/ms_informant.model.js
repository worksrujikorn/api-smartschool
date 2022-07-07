module.exports = (sequelize, Sequelize) => {
    const ms_informant = sequelize.define("ms_informant", {
        ms_informant_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ms_informant: {
            type: Sequelize.STRING(100)
        },

      
       
    });
    return ms_informant;
};