module.exports = (sequelize, Sequelize) => {
    const ms_welfare_safety = sequelize.define("ms_welfare_safety", {
        ms_welfare_safety_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ms_welfare_safety: {
            type: Sequelize.STRING(100)
        },

      
       
    });
    return ms_welfare_safety;
};