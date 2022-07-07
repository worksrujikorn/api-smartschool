const db = require("../models");
const T_home_visit = db.t_home_visit;
const T_test = db.test_test;
const Op = db.Sequelize.Op;
const { QueryTypes } = require("sequelize");

const con_date_now = (date_ob) => {
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  const date_now = year + "-" + month + "-" + date;

  // const datetime_now = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

  return date_now;
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title && !req.body.description) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Tutorial
  console.log(req.body.iframe_google_map);

  const t_home_visit = {
    school_id: req.body.school_id,
    school_year: req.body.school_year,
    school_term: req.body.school_term,
    visit_date: req.body.visit_date,
    student_id: req.body.student_id,
    teacher_id: req.body.teacher_id,
    title: req.body.title,
    firstname: req.body.firstname_student,
    lastname: req.body.lastname_student,
    student_no: req.body.student_no,
    classroom_code: req.body.classroom_code,
    phonenumber: req.body.phonenumber,
    father_name: req.body.father_name,
    father_occupation: req.body.father_occupation,
    father_phonenumber: req.body.father_phonenumber,
    mother_name: req.body.mother_name,
    mother_occupation: req.body.mother_occupation,
    mother_phonenumber: req.body.mother_phonenumber,
    fm_marital_status: req.body.fm_marital_status,
    parent_name: req.body.parent_name,
    parent_relation: req.body.parent_relation,
    parent_occupaton: req.body.parent_occupaton,
    parent_phonenumber: req.body.parent_phonenumber,
    household_member: req.body.household_member,
    hours_family_together: req.body.hours_family_together,
    relationship_father_chk: req.body.relationship_father_chk,
    relationship_mother_chk: req.body.relationship_mother_chk,
    relationship_brother_chk: req.body.relationship_brother_chk,
    relationship_sister_chk: req.body.relationship_sister_chk,
    relationship_grand: req.body.relationship_grand,
    relationship_relative: req.body.relationship_relative,
    relationship_other: req.body.relationship_other,
    relationship_other_name: req.body.relationship_other_name,
    parents_leave_child_with_someone: req.body.parents_leave_child_with_someone,
    parents_leave_child_with_someone_other:
      req.body.parents_leave_child_with_someone_other,
    household_income: req.body.household_income,
    receive_expenses_from: req.body.receive_expenses_from,
    money_to_school: req.body.money_to_school,
    work_to_earn: req.body.work_to_earn,
    work_to_earn_inc_perday: req.body.work_to_earn_inc_perday,
    want_schools_help: req.body.want_schools_help,
    want_schools_help_other: req.body.want_schools_help_other,
    agency_help: req.body.agency_help,
    agency_help_other: req.body.agency_help_other,
    Parents_concern: req.body.Parents_concern,
    dependency: req.body.dependency,
    housing_type: req.body.housing_type,
    housing_envir: req.body.housing_envir,
    housing_envir_other: req.body.housing_envir_other,
    fm_vehicle: req.body.fm_vehicle,
    farm_land: req.body.farm_land,
    farm_land_number: req.body.farm_land_number,
    health: req.body.health,
    welfare_safety: req.body.welfare_safety,
    distance_school_km: req.body.distance_school_km,
    distance_school_hr: req.body.distance_school_hr,
    distance_school_min: req.body.distance_school_min,
    journey: req.body.journey,
    journey_other: req.body.journey_other,
    work_responsibility: req.body.work_responsibility,
    work_responsibility_other: req.body.work_responsibility_other,
    hobbies: req.body.hobbies,
    hobbies_other: req.body.hobbies_other,
    substance_abuse: req.body.substance_abuse,
    violent: req.body.violent,
    violent_other: req.body.violent_other,
    sexual: req.body.sexual,
    game_addiction: req.body.game_addiction,
    game_addiction_other: req.body.game_addiction_other,
    com_internet: req.body.com_internet,
    electronic_comm: req.body.electronic_comm,
    informant: req.body.informant,
    current_address: req.body.current_address,
    current_address_near: req.body.current_address_near,
    attached_photos: req.body.attached_photos,
    photo_house: req.body.photo_house,
    photo_teacher_fm_student: req.body.photo_teacher_fm_student,
    geolocation_house: req.body.geolocation_house,
    teacher_signature1: req.body.teacher_signature1,
    teacher_signature2: req.body.teacher_signature2,
    teacher_signature3: req.body.teacher_signature3,
    Created_date: new Date(),
    Cwho: req.body.Cwho,
    iframe_google_map: req.body.iframe_google_map,
    google_map: req.body.google_map,
  };
  // console.log(req.body.fm_vehicle.moto)
  // Save Tutorial in the database
  T_home_visit.create(t_home_visit)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the t_home_visit.",
      });
    });
};
exports.findAll = (req, res) => {
  console.log("woaaaaaaaaa");
  //const title = req.query.title;
  //var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  T_home_visit.findAll() //{ where: condition }
    .then((data) => {
      console.log("----");
      res.send(data);
    })
    .catch((err) => {
      console.log("----->>>>", err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving t_home_visits.",
      });
    });
};
exports.findOne = (req, res) => {
  db.sequelize
    .query(
      `	SELECT thv.title,
      thv.firstname as firstname_student ,
      thv.lastname as lastname_student ,
      thv.student_no ,
      tmc.classroom_name ,
      thv.phonenumber,
      thv.father_name,
      thv.father_occupation,
      thv.father_phonenumber,
      thv.mother_name,
      thv.mother_occupation,
      thv.mother_phonenumber,
      thv.fm_marital_status,
      thv.parent_relation,
      thv.parent_name,
      thv.parent_occupaton,
      thv.parent_phonenumber,
      thv.household_member,
      thv.hours_family_together,
      thv.relationship_father_chk,
      thv.relationship_mother_chk,
      thv.relationship_brother_chk,
      thv.relationship_sister_chk,
      thv.relationship_grand,
      thv.relationship_relative,
      thv.relationship_other,
      thv.relationship_other_name,
      thv.parents_leave_child_with_someone,
      thv.parents_leave_child_with_someone_other,
      thv.household_income,
      thv.receive_expenses_from,
      thv.money_to_school,
      thv.work_to_earn,
      thv.work_to_earn_inc_perday,
      thv.want_schools_help,
      thv.want_schools_help_other,
      thv.agency_help,
      thv.agency_help_other,
      thv.Parents_concern,
      thv.dependency,
      thv.housing_type,
      thv.housing_envir,
      thv.housing_envir_other,
      thv.fm_vehicle,
      thv.farm_land,
      thv.farm_land_number,
      thv.health,
      thv.welfare_safety,
      thv.distance_school_km,
      thv.distance_school_hr,
      thv.distance_school_min,
      thv.journey,
      thv.journey_other,
      thv.work_responsibility,
      thv.work_responsibility_other,
      thv.hobbies,
      thv.hobbies_other,
      thv.substance_abuse,
      thv.violent,
      thv.violent_other,
      thv.sexual,
      thv.game_addiction,
      thv.game_addiction_other,
      thv.com_internet,
      thv.electronic_comm,
      thv.informant,
      thv.current_address,
      thv.current_address_near,
      thv.attached_photos,
      thv.photo_house,
      thv.photo_teacher_fm_student,
      thv.geolocation_house,
      thv.teacher_signature1,
      thv.teacher_signature2,
      thv.teacher_signature3,
      thv.Created_date,
      thv.Cwho,
      thv.iframe_google_map,
      thv.google_map,
      thv.visit_date,
      tms.picture
      
      FROM t_home_visit thv
      JOIN t_master_student tms on tms.student_code  = thv.student_id 
      JOIN t_master_classroom tmc on tmc.classroom_code = thv.classroom_code
      LEFT JOIN t_master_parent tmp on tmp.student_code = tms.student_code
      WHERE thv.home_visit_id = ${req.body.home_visit_id} GROUP BY home_visit_id `,
      { type: QueryTypes.SELECT }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({ msg: "no data found", status: false });
      console.log(err);
    });
};
exports.update = (req, res) => {
  const id = req.params.id;
  // console.log(req.body.iframe_google_map)
  T_home_visit.update(req.body, {
    where: { home_visit_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "t_home_visit was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update t_home_visit with id=${id}. Maybe t_home_visit was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating t_home_visit with id=" + id,
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  T_home_visit.destroy({
    where: { home_visit_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "t_home_visit was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete t_home_visit with id=${id}. Maybe t_home_visit was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete t_home_visit with id=" + id,
      });
    });
};

exports.get_homevisit = (req, res) => {
  db.sequelize
    .query(
      `		SELECT tn.news_code , tn.news_subject,tn.news_detail,tn.news_picture,tn.news_start,tn.news_end,tn.news_status FROM t_news tn
        WHERE ('${date_now}'  BETWEEN CAST(news_start as date )   AND  CAST(news_end as date )) `,
      { type: QueryTypes.SELECT }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({ msg: "no data found", status: false });
      console.log(err);
    });
};

exports.report_homevisit = (req, res) => {
  date_ob = new Date();
  // const date_now = con_date_now(date_ob);
  let date_now = date_ob.getFullYear() + 543;
  console.log(date_now);
  db.sequelize
    .query(
      `SELECT
      tms.student_code,
      tms.student_id,
      tss.home_visit_id,
      CONCAT( tms.title, ' ', tms.firstname, ' ', tms.lastname ) AS st_name,
        tms.title,
        tms.firstname AS firstname_student,
        tms.lastname AS lastname_student,
        tss.phonenumber,
        tss.school_term,
        tss.parent_name,
        tss.parent_phonenumber,
        tss.visit_date,
        tss.status_home,
        tss.Created_date,
        tss.Cwho,
        tss.current_teacher,
        tss.teacher_id,
        tss.school_year,
        tms.parent_1,
        tss.student_no,
        tms.picture,
        tss.classroom_code 		
    FROM
      t_master_student tms
      LEFT JOIN (
      SELECT
        ts.student_code,
        ts.student_id,
        hv.home_visit_id,
        CONCAT( ts.title, ' ', ts.firstname, ' ', ts.lastname ) AS st_name,
        ts.title,
        ts.firstname AS firstname_student,
        ts.lastname AS lastname_student,
        hv.phonenumber,
        hv.school_term,
        hv.parent_name,
        hv.parent_phonenumber,
        hv.visit_date,
      CASE
          WHEN hv.visit_date IS NULL THEN
          '0' ELSE '1' 
        END AS status_home,
        hv.Created_date,
        hv.Cwho,
        tt.teacher_code AS current_teacher,
        hv.teacher_id,
        hv.school_year,
        ts.parent_1,
        hv.student_no,
        ts.picture,
        hv.classroom_code 
      FROM
        t_master_student ts
        INNER JOIN t_master_teacher tt ON ts.classroom_code = tt.classroom_code
        LEFT JOIN t_home_visit hv ON ts.student_code = hv.student_id 
      WHERE
        ( hv.school_year = '${req.body.school_year}' OR hv.school_year IS NULL ) 
        AND ts.classroom_code = '${req.body.classroom_code}' 
        AND hv.school_term = '${req.body.school_term}' 
      ORDER BY
        ts.student_id 
      ) tss ON tms.student_id = tss.student_id 
    WHERE
      tms.classroom_code = '${req.body.classroom_code}' 
    ORDER BY
      tms.student_code
    
    `,
      { type: QueryTypes.SELECT }
    )
    .then(async (data) => {
      let data_res = [];
      for await (const iterator of data) {
        if (req.body.school_year == date_now) {
          if (req.body.teacher_code == iterator.teacher_id) {
            if (req.body.classroom_code == req.body.classroom_teacher_code) {
              console.log(
                "check bug",
                req.body.classroom_code,
                "2",
                req.body.classroom_teacher_code
              );
              data_res.push({ ...iterator, status_edit: "1" });
            } else {
              data_res.push({
                ...iterator,
                school_term: null,
                parent_name: null,
                parent_phonenumber: null,
                visit_date: null,
                status_home: "0",
                Created_date: null,
                Cwho: null,
                teacher_code: null,
                school_year: null,
                status_edit: "0",
              });
            }
          } else if (req.body.teacher_code != iterator.teacher_id) {
            if (req.body.classroom_code == req.body.classroom_teacher_code) {
              data_res.push({
                ...iterator,
                school_term: null,
                parent_name: null,
                parent_phonenumber: null,
                visit_date: null,
                status_home: "0",
                Created_date: null,
                Cwho: null,
                teacher_code: null,
                school_year: null,
                status_edit: "2",
              });
            } else {
              data_res.push({
                ...iterator,
                school_term: null,
                parent_name: null,
                parent_phonenumber: null,
                visit_date: null,
                status_home: "0",
                Created_date: null,
                Cwho: null,
                teacher_code: null,
                school_year: null,
                status_edit: "3",
              });
            }
          }
        } else if (req.body.school_year != date_now) {
          if (req.body.classroom_code == iterator.classroom_code) {
            data_res.push({ ...iterator, status_edit: "0" });
          } else if (iterator.classroom_code == null) {
            data_res.push({
              ...iterator,
              school_term: null,
              parent_name: null,
              parent_phonenumber: null,
              visit_date: null,
              status_home: "0",
              Created_date: null,
              Cwho: null,
              teacher_code: null,
              school_year: null,
              status_edit: "3",
            });
          }
        }
      }
      res.status(200).send(data_res);
    })
    .catch((err) => {
      res.send({ msg: "no data found", status: false });
      console.log(err);
    });
};

exports.test_add = (req, res) => {
  // Validate request

  // Create a Tutorial

  const t_test = {
    detail: req.body.detail,
  };
  // console.log(req.body.fm_vehicle.moto)
  // Save Tutorial in the database
  T_test.create(t_test)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the t_home_visit.",
      });
    });
};
