module.exports = (sequelize, Sequelize) => {
    const t_master_behaviour = sequelize.define("t_master_behaviour", {
        behaviour_id: {
            type: Sequelize.STRING(10),
            primaryKey: true
        },
        behaviour_name: {
            type: Sequelize.STRING(100)
        },

        score: {
            type: Sequelize.INTEGER(11)
        },
       
    });
    return t_master_behaviour;
};