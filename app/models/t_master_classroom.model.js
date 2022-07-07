module.exports = (sequelize, Sequelize) => {
    const t_master_classroom = sequelize.define("t_master_classroom", {
       classroom_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        classroom_code: {
            type: Sequelize.STRING(7)
        },

        classroom_name: {
            type: Sequelize.STRING(50)
        },
        detail: {
            type: Sequelize.STRING(255)
        },
        createdate: {
            type: Sequelize.DATE
        },
        who: {
            type: Sequelize.STRING(100)
        },
        classroom_level : {
            type: Sequelize.STRING(20)
        },
       

    });
    return t_master_classroom;
};