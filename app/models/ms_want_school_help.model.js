module.exports = (sequelize, Sequelize) => {
    const ms_want_school_help = sequelize.define("ms_want_school_help", {
        ms_want_school_help_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ms_want_school_help: {
            type: Sequelize.STRING(100)
        },

      
       
    });
    return ms_want_school_help;
};