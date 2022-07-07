module.exports = (sequelize, Sequelize) => {
    const ms_parents_leave_child_with_someone = sequelize.define("ms_parents_leave_child_with_someone", {
        ms_parents_leave_child_with_someone_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ms_parents_leave_child_with_someone: {
            type: Sequelize.STRING(100)
        },

      
       
    });
    return ms_parents_leave_child_with_someone;
};