module.exports = (sequelize, Sequelize) => {
    const t_notification = sequelize.define("t_notification", {
        notification_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        Username: {
            type: Sequelize.STRING(20)
        },

        Category: {
            type: Sequelize.STRING(1)
        },
        Message: {
            type: Sequelize.STRING(250)
        },
        createdate: {
            type: Sequelize.DATE
        },
        who: {
            type: Sequelize.STRING(100)
        },
       


    });
    return t_notification;
};