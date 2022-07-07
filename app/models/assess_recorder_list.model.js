module.exports = (sequelize, Sequelize) => {
    const assess_recorder_list = sequelize.define("assess_recorder_list", {

        assess_recorder_list_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        recorder_code: {
            type: Sequelize.STRING(7)
        },
        score_id: {
            type: Sequelize.STRING(13)
        },
       
    });
    return assess_recorder_list;
};