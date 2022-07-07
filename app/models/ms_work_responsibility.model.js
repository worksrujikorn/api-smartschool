module.exports = (sequelize, Sequelize) => {
    const ms_work_responsibility = sequelize.define("ms_work_responsibility", {
        ms_work_responsibility_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ms_work_responsibility: {
            type: Sequelize.STRING(100)
        },

      
       
    });
    return ms_work_responsibility;
};