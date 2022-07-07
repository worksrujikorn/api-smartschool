module.exports = (sequelize, Sequelize) => {
    const ms_violent = sequelize.define("ms_violent", {
        ms_violent_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ms_violent: {
            type: Sequelize.STRING(100)
        },

      
       
    });
    return ms_violent;
};