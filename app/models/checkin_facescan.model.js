module.exports = (sequelize, Sequelize) => {
    const checkin_facescan = sequelize.define("checkin_facescan", {
        checkin_facescan_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        facescan_code: {
            type: Sequelize.STRING(7)
        },
        timein: {
            type: Sequelize.DATE
        },
        timeout: {
            type: Sequelize.DATE
        },
        time_line: {
            type: Sequelize.DATE
        },
        scan_status: {
            type: Sequelize.STRING(7)
        },
       
    });
    return checkin_facescan;
};