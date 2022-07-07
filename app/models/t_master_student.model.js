module.exports = (sequelize, Sequelize) => {
    const t_master_student = sequelize.define("t_master_student", {
 
        student_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        student_code: {
            type: Sequelize.STRING(7)
        },
        student_idcard: {
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
        firstname_en: {
            type: Sequelize.STRING(250)
        },
        lastname_en: {
            type: Sequelize.STRING(250)
        },
        birthday: {
            type: Sequelize.STRING(12)
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
            type: Sequelize.STRING(500)
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
        classroom_code: {
            type: Sequelize.STRING(7)
        },
        createdate: {
            type: Sequelize.DATE
        },
        who: {
            type: Sequelize.STRING(100)
        },
       

    });
    return t_master_student;
};