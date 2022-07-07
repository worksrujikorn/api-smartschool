module.exports = (sequelize, Sequelize) => {
    const ms_com_internet = sequelize.define("ms_com_internet", {
        ms_com_internet_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ms_com_internet: {
            type: Sequelize.STRING(100)
        },

      
       
    });
    return ms_com_internet;
};