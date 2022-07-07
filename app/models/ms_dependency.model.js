module.exports = (sequelize, Sequelize) => {
    const ms_dependency = sequelize.define("ms_dependency", {
        ms_dependency_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ms_dependency: {
            type: Sequelize.STRING(100)
        },

      
       
    });
    return ms_dependency;
};