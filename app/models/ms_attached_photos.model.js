module.exports = (sequelize, Sequelize) => {
    const ms_attached_photos = sequelize.define("ms_attached_photos", {
        ms_attached_photos_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ms_attached_photos: {
            type: Sequelize.STRING(255)
        },

      
       
    });
    return ms_attached_photos;
};