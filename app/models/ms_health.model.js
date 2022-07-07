module.exports = (sequelize, Sequelize) => {
    const ms_health = sequelize.define("ms_health", {
        ms_health_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ms_health: {
            type: Sequelize.STRING(100)
        },

      
       
    });
    return ms_health;
};