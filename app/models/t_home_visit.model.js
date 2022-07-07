module.exports = (sequelize, Sequelize) => {
    const t_home_visit = sequelize.define("t_home_visit", {
        home_visit_id: {
            type: Sequelize.INTEGER(11),
            autoIncrement: true,
            primaryKey: true
        },
        school_id: {
            type: Sequelize.INTEGER()
        },
        school_year: {
            type: Sequelize.STRING(11)
        },
        school_term: {
            type: Sequelize.STRING(11)
        },
        visit_date: {
            type: Sequelize.DATE
        },
        student_id: {
            type: Sequelize.STRING(11)
        },
        teacher_id: {
            type: Sequelize.STRING(11)
        },
        title: {
            type: Sequelize.STRING(20)
        },
        firstname: {
            type: Sequelize.STRING(50)
        },
        lastname: {
            type: Sequelize.STRING(50)
        },
        student_no: {
            type: Sequelize.INTEGER()
        },
        classroom_code: {
            type: Sequelize.STRING(20)
        },
        phonenumber: {
            type: Sequelize.STRING(20)
        },
        father_name: {
            type: Sequelize.STRING(100)
        },
        father_occupation: {
            type: Sequelize.STRING(100)
        },
        father_phonenumber: {
            type: Sequelize.STRING(20)
        },
        mother_name: {
            type: Sequelize.STRING(100)
        },
        mother_occupation: {
            type: Sequelize.STRING(100)
        },
        mother_phonenumber: {
            type: Sequelize.STRING(20)
        },
        fm_marital_status: {
            type: Sequelize.STRING(20)
        },
        parent_name: {
            type: Sequelize.STRING(100)
        },
        parent_relation: {
            type: Sequelize.STRING(100)
        },
        parent_occupaton: {
            type: Sequelize.STRING(100)
        },
        parent_phonenumber: {
            type: Sequelize.STRING(20)
        },
        household_member: {
            type: Sequelize.STRING(20)
        },
        hours_family_together: {
            type: Sequelize.STRING(20)
        },
        relationship_father_chk: {
            type: Sequelize.STRING(20)
        },
        relationship_mother_chk: {
            type: Sequelize.STRING(20)
        },
        relationship_brother_chk: {
            type: Sequelize.STRING(20)
        },
        relationship_sister_chk: {
            type: Sequelize.STRING(20)
        },
        relationship_grand: {
            type: Sequelize.STRING(20)
        },
        relationship_relative: {
            type: Sequelize.STRING(20)
        },
        relationship_other: {
            type: Sequelize.STRING(20)
        },
        relationship_other_name: {
            type: Sequelize.STRING(20)
        },
        parents_leave_child_with_someone: {
            type: Sequelize.STRING(20)
        },
        parents_leave_child_with_someone_other: {
            type: Sequelize.STRING(100)
        },
        household_income: {
            type: Sequelize.STRING(20)
        },
        receive_expenses_from: {
            type: Sequelize.STRING(50)
        },
        money_to_school: {
            type: Sequelize.STRING(20)
        },
        work_to_earn: {
            type: Sequelize.STRING(100)
        },
        work_to_earn_inc_perday: {
            type: Sequelize.STRING(20)
        },
        want_schools_help: {
            type: Sequelize.JSON()
        },
        want_schools_help_other: {
            type: Sequelize.STRING(100)
        },
        agency_help: {
            type: Sequelize.JSON()
        },
        agency_help_other: {
            type: Sequelize.STRING(100)
        },
        Parents_concern: {
            type: Sequelize.STRING(500)
        },
        dependency: {
            type: Sequelize.JSON()
        },
        housing_type: {
            type: Sequelize.JSON()
        },
        housing_envir: {
            type: Sequelize.JSON()
        },
        housing_envir_other: {
            type: Sequelize.STRING(100)
        },
        fm_vehicle: {
            type: Sequelize.JSON()
        },
        farm_land: {
            type: Sequelize.STRING(20)
        },
        farm_land_number: {
            type: Sequelize.STRING(20)
        },
        health: {
            type: Sequelize.JSON()
        },
        welfare_safety: {
            type: Sequelize.JSON()
        },
        distance_school_km: {
            type: Sequelize.STRING(20)
        },
        distance_school_hr: {
            type: Sequelize.STRING(20)
        },
        distance_school_min: {
            type: Sequelize.STRING(20)
        },
        journey: {
            type: Sequelize.STRING(20)
        },
        journey_other: {
            type: Sequelize.STRING(50)
        },
        work_responsibility: {
            type: Sequelize.JSON()
        },
        work_responsibility_other: {
            type: Sequelize.STRING(100)
        },
        hobbies: {
            type: Sequelize.JSON()
        },
        hobbies_other: {
            type: Sequelize.STRING(100)
        },
        substance_abuse: {
            type: Sequelize.JSON()
        },
        violent: {
            type: Sequelize.JSON()
        },
        violent_other: {
            type: Sequelize.STRING(100)
        },
        sexual: {
            type: Sequelize.JSON()
        },
        game_addiction: {
            type: Sequelize.JSON()
        },
        game_addiction_other: {
            type: Sequelize.STRING(100)
        },
        com_internet: {
            type: Sequelize.STRING(20)
        },
        electronic_comm: {
            type: Sequelize.STRING(20)
        },
        informant: {
            type: Sequelize.JSON()
        },
        current_address: {
            type: Sequelize.STRING(200)
        },
        current_address_near: {
            type: Sequelize.STRING(200)
        },
        attached_photos: {
            type: Sequelize.STRING(20)
        },
        photo_house: {
            type: Sequelize.STRING(500)
        },
        photo_teacher_fm_student: {
            type: Sequelize.STRING(500)
        },
        geolocation_house: {
            type: Sequelize.STRING(500)
        },
        teacher_signature1: {
            type: Sequelize.STRING(500)
        },
        teacher_signature2: {
            type: Sequelize.STRING(500)
        },
        teacher_signature3: {
            type: Sequelize.STRING(500)
        },
        Created_date: {
            type: Sequelize.DATE
        },
        Cwho: {
            type: Sequelize.STRING(500)
        },
        iframe_google_map: {
            type: Sequelize.STRING(500)
        },
        google_map: {
            type: Sequelize.STRING(500)
        },
    });
    return t_home_visit;
};