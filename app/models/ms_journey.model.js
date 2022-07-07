module.exports = (sequelize, Sequelize) => {
    const ms_journey = sequelize.define("ms_journey", {
        ms_journey_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ms_journey: {
            type: Sequelize.STRING(100)
        },

      
       
    });
    return ms_journey;
};