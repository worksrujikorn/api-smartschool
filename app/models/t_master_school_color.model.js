module.exports = (sequelize, Sequelize) => {
    const t_master_school_color = sequelize.define("t_master_school_color", {
        school_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        school_code : {
            type: Sequelize.STRING(7)
        },
        school_name: {
            type: Sequelize.STRING(50)
        },
        sidebarcolor: {
            type: Sequelize.STRING(50)
        },
        sidebarfrontcolor : {
            type: Sequelize.STRING(50)
        },
        iconcolor: {
            type: Sequelize.STRING(50)
        },
        hoversidebarfrontcolor: {
            type: Sequelize.STRING(50)
        },
        logouticoncolor : {
            type: Sequelize.STRING(50)
        },
        notifyiconcolor: {
            type: Sequelize.STRING(50)
        },
        notifyfrontcolor: {
            type: Sequelize.STRING(50)
        },
        dasbordfront : {
            type: Sequelize.STRING(50)
        },
        createdate: {
            type: Sequelize.DATE
        },
        who: {
            type: Sequelize.STRING(100)
        },
    });
    return t_master_school_color;
};