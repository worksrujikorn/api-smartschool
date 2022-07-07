module.exports = (sequelize, Sequelize) => {
    const t_master_parent = sequelize.define("t_master_parent", {
        parent_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        student_code: {
            type: Sequelize.STRING(7)
        },
        parent_code : {
            type: Sequelize.STRING(9)
        },
        parent_idcard: {
            type: Sequelize.STRING(13)
        },
        title: {
            type: Sequelize.STRING(100)
        },
        firstname: {
            type: Sequelize.STRING(250)
        },
        lastname: {
            type: Sequelize.STRING(250)
        },
        phonenumber: {
            type: Sequelize.STRING(20)
        },
        Address: {
            type: Sequelize.STRING(250)
        },
        email: {
            type: Sequelize.STRING(200)
        },
        picture: {
            type: Sequelize.STRING(50)
        },
        username: {
            type: Sequelize.STRING(20)
        },
        password: {
            type: Sequelize.STRING(20)
        },
        role: {
            type: Sequelize.INTEGER(11)
        },
        detail: {
            type: Sequelize.STRING(500)
        },
        createdate: {
            type: Sequelize.DATE
        },
        who: {
            type: Sequelize.STRING(100)
        },
       
       
    });
    return t_master_parent;
};