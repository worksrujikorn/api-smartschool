module.exports = (sequelize, Sequelize) => {
    const ms_relatoinship_family = sequelize.define("ms_relatoinship_family", {
        ms_relatoinship_family_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ms_relatoinship_family: {
            type: Sequelize.STRING(100)
        },

      
       
    });
    return ms_relatoinship_family;
};