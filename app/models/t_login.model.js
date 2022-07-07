module.exports = (sequelize, Sequelize) => {
    const t_login = sequelize.define("t_login", {
        login_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        login_code: {
            type: Sequelize.STRING(9)
        },

        username: {
            type: Sequelize.STRING(20)
        },
        password: {
            type: Sequelize.STRING(200)
        },
        role: {
            type: Sequelize.INTEGER(11)
        },  
        token: {
            type: Sequelize.STRING(255)
        },
        device: {
            type: Sequelize.STRING(255)
        },
        createdate: {
            type: Sequelize.DATE
        },
        who: {
            type: Sequelize.STRING(100)
        },
       

    });
    return t_login;
};