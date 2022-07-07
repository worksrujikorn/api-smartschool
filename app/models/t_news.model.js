module.exports = (sequelize, Sequelize) => {
    const t_news = sequelize.define("t_news", {
       news_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        news_code: {
            type: Sequelize.STRING(7)
        },
        news_subject: {
            type: Sequelize.STRING(50)
        },
        news_detail: {
            type: Sequelize.STRING(200)
        },
        news_picture: {
            type: Sequelize.STRING(100)
        },
        news_start: {
            type: Sequelize.DATE
        },
        news_end: {
            type: Sequelize.DATE
        },
        news_status: {
            type: Sequelize.INTEGER(2)
        },
        createdate: {
            type: Sequelize.DATE
        },
        who: {
            type: Sequelize.STRING(100)
        },
       
    });
    return t_news;
};