module.exports = (sequelize, Sequelize) => {
    const t_master_room = sequelize.define("t_master_room", {
       room_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        room_code : {
            type: Sequelize.STRING(7)
        },
        room_name: {
            type: Sequelize.STRING(50)
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
    return t_master_room;
};