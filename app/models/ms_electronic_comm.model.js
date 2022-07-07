module.exports = (sequelize, Sequelize) => {
    const ms_electronic_comm = sequelize.define("ms_electronic_comm", {
        ms_electronic_comm_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ms_electronic_comm: {
            type: Sequelize.STRING(100)
        },

      
       
    });
    return ms_electronic_comm;
};