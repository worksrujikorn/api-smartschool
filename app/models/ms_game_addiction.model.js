module.exports = (sequelize, Sequelize) => {
    const ms_game_addiction = sequelize.define("ms_game_addiction", {
        ms_game_addiction_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ms_game_addiction: {
            type: Sequelize.STRING(100)
        },

      
       
    });
    return ms_game_addiction;
};