module.exports = (sequelize, Sequelize) => {
    const ms_sexual = sequelize.define("ms_sexual", {
        ms_sexual_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ms_sexual: {
            type: Sequelize.STRING(100)
        },

      
       
    });
    return ms_sexual;
};