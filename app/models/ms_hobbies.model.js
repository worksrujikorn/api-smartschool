module.exports = (sequelize, Sequelize) => {
    const ms_hobbies = sequelize.define("ms_hobbies", {
        ms_hobbies_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ms_hobbies: {
            type: Sequelize.STRING(100)
        },

      
       
    });
    return ms_hobbies;
};