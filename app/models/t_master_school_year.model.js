module.exports = (sequelize, Sequelize) => {
    const t_master_school_year = sequelize.define("t_master_school_year", {
        school_year_id: {
            type: Sequelize.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
     
        school_term: {
            type: Sequelize.STRING(50)
        },
        school_year: {
            type: Sequelize.STRING(50)
        },
        school_year_start: {
            type: Sequelize.DATE
        },
        school_year_end: {
            type: Sequelize.DATE
        },

        createdate: {
            type: Sequelize.DATE
        },
       
    });
    return t_master_school_year;
};