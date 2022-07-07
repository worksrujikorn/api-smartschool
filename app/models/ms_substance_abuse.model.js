module.exports = (sequelize, Sequelize) => {
    const ms_substance_abuse = sequelize.define("ms_substance_abuse", {
        ms_substance_abuse_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ms_substance_abuse: {
            type: Sequelize.STRING(100)
        },

      
       
    });
    return ms_substance_abuse;
};