const db = require("../models");
const db_moodle = require("../models/mdl_user");
const Op = db.Sequelize.Op;
const { QueryTypes } = require("sequelize");
const code = require("./gencode.controller.js");
const Teachers = db.t_master_teacher;
const Leave = db.t_leave;
const Comment = db.t_comment;

var moment = require("moment");

// const sendMail = require("../middleware/sendMail");
var bcrypt = require("bcryptjs");
const User = db.t_login;
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

const con_datetime_now = (date_ob) => {
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

  const datetime_now =
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  return datetime_now;
};
exports.create = (req, res) => {
  // Save User to Database
  if (!req.body.teacher_code && !req.body.teacher_idcard) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const register_teacher = {
    teacher_code: req.body.teacher_code,
    teacher_idcard: req.body.teacher_idcard,
    title: req.body.title,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phonenumber: req.body.phonenumber,
    Address: req.body.Address,
    email: req.body.email,
    picture: req.body.picture,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    detail: req.body.detail,
    classroom_code: req.body.classroom_code,
    group_code: req.body.group_code,
    subject_code: req.body.subject_code,
    createdate: new Date(),
    who: req.body.who,
  };

  Teachers.create(register_teacher)
    .then((data) => {
      User.create({
        login_code: data.teacher_code,
        username: req.body.username,
        role: 3,
        password: bcrypt.hashSync(req.body.password, 4),
        createdate: new Date(),
        who: req.body.who,
      }).then((user) => {
        db_moodle.sequelize
          .query(
            `INSERT INTO mdl_user (auth,confirmed, policyagreed,deleted,suspended,mnethostid,username,password,idnumber,firstname,lastname,email,emailstop,phone1,phone2, institution,department,address,city,country,lang,calendartype,theme,timezone,firstaccess,lastaccess,lastlogin,currentlogin,lastip,secret,picture,description,descriptionformat,mailformat,maildigest,maildisplay,autosubscribe,trackforums,timecreated,timemodified) 
                  VALUES ('manual',1,0,0,0,1,'${req.body.username
            }' , '${bcrypt.hashSync(req.body.password, 4)}',idnumber,'${req.body.firstname
            }','${req.body.lastname}','${req.body.email}',0,
                    '${req.body.phonenumber
            }','', '','','','','TH','en','gregorian','',99,0,0,0,0,'','','0','',1,1,0,2,1,0,0,0)`,

            {
              type: QueryTypes.INSERT,
            }
          )
          .then((moodle) => {
            res.status(200).send({ message: "success", data: data });
          })
          .catch((moodle_err) => {
            res
              .status(200)
              .send({
                Msg: "Error",
                msgdescription: moodle_err.message,
                Status: false,
              });
            console.log(moodle_err);
          });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  const update_teacher = {
    teacher_id: req.body.teacher_id,
    teacher_code: req.body.teacher_code,
    teacher_idcard: req.body.teacher_idcard,
    title: req.body.title,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phonenumber: req.body.phonenumber,
    Address: req.body.Address,
    email: req.body.email,
    picture: req.body.picture,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    detail: req.body.detail,
    classroom_code: req.body.classroom_code,
    group_code: req.body.group_code,
    subject_code: req.body.subject_code,
    createdate: new Date(),
    who: req.body.who,
  };

  Teachers.update(update_teacher, {
    where: { teacher_code: id },
  })
    .then((num) => {
      if (num == 1) {
        let pass = bcrypt.hashSync(req.body.password, 4);
        // let pass_modle = bcrypt.hashSync(req.body.password,);
        console.log(req.body.password);
        db.sequelize
          .query(
            `
             UPDATE  t_login SET password ='${pass}' WHERE login_code = '${id}'`,
            {
              type: QueryTypes.UPDATE,
            }
          )
          .then((num) => { 
            console.log(num);
            
            if (num[1] == 1) {
              db_moodle.sequelize
                .query(
                  `UPDATE mdl_user SET password ='${pass}' WHERE username = '${req.body.username}'`,

                  {
                    type: QueryTypes.UPDATE,
                  }
                )
                .then((moodle) => {
                  res.status(200).send({ message: "Update Successful", status: true });
                })
                .catch((moodle_err) => {
                  res
                    .status(200)
                    .send({
                      Msg: "Error",
                      msgdescription: moodle_err.message,
                      Status: false,
                    });
                  console.log(moodle_err);
                });
            } else {
              res.send({
                message: `Cannot update login with id = ${id}. Maybe login was not found or req.body is empty12312!`,
              });
            }
          });
      } else {
        res.send({
          message: `Cannot update teacher with id = ${id}. Maybe teacher was not found or req.body is empty! `,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating teacher with id=" + id,
      });
    });
};

exports.findAll = (req, res) => {
  db.sequelize
    .query(
      `SELECT tmt.teacher_id,tmt.teacher_code, tmt.picture as picture ,tmt.firstname as firstname ,tmt.lastname as lastname ,tmc.classroom_name   as classroom_name ,tmc.classroom_code as classroom_code, tmt.teacher_idcard as teacher_idcard    ,tmt.Address   as Address ,tmt.detail as detail ,  tmt.email as email  ,  tmt.phonenumber as phonenumber ,tmt.username as username , tmt.password as password , tmg.group_code,tmg.group_name
      FROM t_master_teacher tmt LEFT JOIN t_master_classroom tmc ON  tmt.classroom_code = tmc.classroom_code
			LEFT JOIN t_master_group tmg ON  tmg.group_code = tmt.group_code
          `,
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Teachers.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  db.sequelize
    .query(
      `			SELECT tmt.teacher_id,tmt.teacher_code, tmt.picture as picture ,tmt.firstname as firstname ,tmt.lastname as lastname ,tmc.classroom_name   as classroom_name ,tmc.classroom_code as classroom_code, tmt.teacher_idcard as teacher_idcard    ,tmt.Address   as Address ,tmt.detail as detail ,  tmt.email as email  ,  tmt.phonenumber as phonenumber ,tmt.username as username , tmt.password as password , tmg.group_code,tmg.group_name
      FROM t_master_teacher tmt LEFT JOIN t_master_classroom tmc ON  tmt.classroom_code = tmc.classroom_code
			LEFT JOIN t_master_group tmg ON  tmg.group_code = tmt.group_code  
           WHERE   tmt.teacher_code = '${id}' `,
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((_res) => {
      res.send(_res);
    });

  Teachers.findAll({ where: { teacher_code: id } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find teacher with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving teacher with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Teachers.destroy({
    where: { teacher_code: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Teacher was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Teacher with id=${id}. Maybe Teacher was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Teacher with id=" + id,
      });
    });
};

exports.dashboardstudentoverall = async (req, res) => {
  date_ob = new Date();
  const classroom = req.params.class;
  const date_now = con_date_now(date_ob);
  db.sequelize
    .query(
      `
      SELECT COUNT(DISTINCT (ts.student_code)) as absented, (SELECT COUNT(DISTINCT (cf.facescan_code)) as attended
      FROM t_master_student ts 
      JOIN checkin_facescan cf ON ts.student_code = cf.facescan_code
      JOIN t_master_classroom tc ON ts.classroom_code = tc.classroom_code
      JOIN t_master_teacher tt ON tc.classroom_code = tt.classroom_code
      WHERE CAST(cf.timein as date) = '${date_now}' AND ts.classroom_code = '${classroom}'
      ) as attended, (SELECT COUNT(DISTINCT (cf.facescan_code)) as late
      FROM t_master_student ts 
      JOIN checkin_facescan cf ON ts.student_code = cf.facescan_code
      JOIN t_master_classroom tc ON ts.classroom_code = tc.classroom_code
      JOIN t_master_teacher tt ON tc.classroom_code = tt.classroom_code
      WHERE CAST(cf.timein as date) = '${date_now}' 
      AND CAST(cf.timein as time) BETWEEN '08:01' AND '16:00'
      AND ts.classroom_code = '${classroom}'
      ) as late, (SELECT COUNT(*) as 'leave'
      FROM t_leave tl
			JOIN t_master_student tms ON tl.leave_person = tms.student_code
      WHERE tl.classroom_code = '${classroom}' AND CAST(tl.leave_from as date) = '${date_now}') as 'leave'
      FROM t_master_student ts 
      JOIN t_master_classroom tc ON ts.classroom_code = tc.classroom_code
      JOIN t_master_teacher tt ON tc.classroom_code = tt.classroom_code
      WHERE ts.student_code NOT IN
      (SELECT ts.student_code
      FROM t_master_student ts 
      LEFT JOIN checkin_facescan cf ON ts.student_code = cf.facescan_code
      WHERE CAST(cf.timein as date) = '${date_now}'
      ) AND ts.classroom_code = '${classroom}'`,
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((_res) => {
      res.send(_res);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.teacherschdule = async (req, res) => {
  date_ob = new Date();
  const date_now = con_date_now(date_ob);
  db.sequelize
    .query(
      `SELECT COUNT(*) as All_Schedule, 
      (SELECT COUNT(DISTINCT (schedule_code)) FROM checkin_classroom WHERE teacher_code = '${req.body.teachercode}' AND CAST(datetime as date) = '${date_now}'
      GROUP BY teacher_code) as Done
      FROM t_schedule 
      WHERE teacher_code = '${req.body.teachercode}' AND date = '${req.body.date}'`,
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((_res) => {
      res.send(_res);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.teachertime = async (req, res) => {
  date_ob = new Date();
  const date_now = con_date_now(date_ob);
  db.sequelize
    .query(
      `SELECT tmt.teacher_code, scan_status, CAST(cf.timein as time) as timein, CAST(cf.timeout as time) as timeout FROM checkin_facescan_teacher cf 
            JOIN  t_master_teacher tmt on tmt.teacher_code = cf.facescan_code
            WHERE CAST(cf.timein as date) = '${date_now}'  AND cf.facescan_code = "${req.body.teacher_code}" `,
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((_res) => {
      res.send(_res);
    })
    .catch((err) => {
      res.send({ msg: "error", status: false });
      console.log(err);
    });
};

exports.checkin_list_one = async (req, res) => {
  date_ob = new Date();
  const date_now = con_date_now(date_ob);
  db.sequelize
    .query(
      `  SELECT tms.student_code, cf.check_type, scan_status, CAST(cf.time as time) as time FROM checkin_facescan cf 
        JOIN  t_master_student tms on tms.student_code = cf.facescan_code
        WHERE CAST(cf.time as date) = '${date_now}'  AND cf.facescan_code = "${req.body.student_code}"`,
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((_res) => {
      res.send(_res);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.checkin_list_update_in = async (req, res) => {
  date_ob = new Date();
  const date_now = con_date_now(date_ob);
  db.sequelize
    .query(
      `
        UPDATE  checkin_facescan cf
        SET timein ="${date_now} ${req.body.time}" , who = "${req.body.who}" , description = "${req.body.description}" 
        WHERE checkin_facescan_id = "${req.body.checkin_facescan_id}"`,
      {
        type: QueryTypes.UPDATE,
      }
    )
    .then((_res) => {
      res.send(_res);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.checkin_list_update_out = async (req, res) => {
  date_ob = new Date();
  const date_now = con_date_now(date_ob);
  db.sequelize
    .query(
      `
        UPDATE  checkin_facescan cf
        SET timeout ="${date_now} ${req.body.time}" 
        WHERE checkin_facescan_id = "${req.body.checkin_facescan_id}"`,
      {
        type: QueryTypes.UPDATE,
      }
    )
    .then((_res) => {
      res.send(_res);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.checkin_list_teacher_update_in = async (req, res) => {
  date_ob = new Date();
  const date_now = con_date_now(date_ob);
  db.sequelize
    .query(
      `
        UPDATE  checkin_facescan_teacher cf
        SET timein ="${date_now} ${req.body.time}" , who ="${req.body.who}" , description = " ${req.body.description} " 
        WHERE checkin_facescan_id = "${req.body.checkin_facescan_id}"`,
      {
        type: QueryTypes.UPDATE,
      }
    )
    .then((_res) => {
      res.send(_res);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.checkin_list_teacher_update_out = async (req, res) => {
  date_ob = new Date();
  const date_now = con_date_now(date_ob);
  db.sequelize
    .query(
      `
        UPDATE  checkin_facescan_teacher cf
        SET timeout ="${date_now} ${req.body.time}" 
        WHERE checkin_facescan_id = "${req.body.checkin_facescan_id}"`,
      {
        type: QueryTypes.UPDATE,
      }
    )
    .then((_res) => {
      res.send(_res);
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.Manage_students_comment = async (req, res) => {
  if (!req.body.teacher_code) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  db.sequelize
    .query(`SELECT MAX(comment_code)  as maxid FROM t_comment`, {
      type: QueryTypes.SELECT,
    })
    .then((_res) => {
      date_ob = new Date();
      const date_now = con_datetime_now(date_ob);
      let id = _res[0].maxid.substring(1, 7);
      let txt = _res[0].maxid.substring(0, 1);
      let num = parseInt(id);
      let len = String(id).length;
      console.log(len);
      let result = code.gencode(num, txt, len);
      //   result = "C" + result;

      db.sequelize
        .query(
          `INSERT INTO t_comment (comment_code, comment_detail, student_code, datetime, teacher_code) 
        VALUES ('${result}', '${req.body.comment_detail}', '${req.body.student_code}', '${date_now}', '${req.body.teacher_code}') `,
          {
            type: QueryTypes.INSERT,
          }
        )
        .then((data) => {
          res
            .status(200)
            .send({ data: "Insert Data Successful", status: true });
        })
        .catch((err) => {
          res
            .status(200)
            .send({ msg: "Error", msgdescription: err.message, status: false });
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.leave_get_count = async (req, res) => {
  const id = req.params.id;
  db.sequelize
    .query(
      `	SELECT COUNT(leave_person)  COUNT
        FROM t_leave tl 
        WHERE  tl.leave_person = "${id}"`,
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((_res) => {
      res.send(_res);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.leave_get = async (req, res) => {
  const id = req.params.id;
  db.sequelize
    .query(
      ` 	SELECT tl.leave_person,CAST(tl.leave_from as date) Start_date , CAST(tl.leave_to as date) End_date ,CAST(tl.leave_from as time) Start_time  ,CAST(tl.leave_to as time) End_time,tl.detail,tmc.category_name 
        FROM t_leave tl 
        JOIN t_master_category tmc on tmc.category_code = tl.category_code
        WHERE  tl.leave_person = "${id}"`,
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((_res) => {
      res.status(200).send({ data: _res, status: true });
    })
    .catch((err) => {
      res.status(500).send({ msg: "error", status: false });
      console.log(err);
    });
};

exports.leave_category = async (req, res) => {
  db.sequelize
    .query(` SELECT category_code , category_name FROM t_master_category`, {
      type: QueryTypes.SELECT,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.leave_post = async (req, res) => {
  if (!req.body.leave_person) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  db.sequelize
    .query(`SELECT MAX(leave_code)  as maxid FROM t_leave`, {
      type: QueryTypes.SELECT,
    })
    .then((_res) => {
      date_ob = new Date();
      const date_now = con_datetime_now(date_ob);
      let id = _res[0].maxid.substring(1, 7);
      let txt = _res[0].maxid.substring(0, 1);
      let num = parseInt(id);
      let len = String(num).length;
      // console.log(num);
      let result = code.gencode(num, txt, len);

      // const req_leave_post = {
      //     leave_code: result,
      //     leave_person: req.body.leave_person,
      //     classroom_code: req.body.classroom_code,
      //     leave_type: req.body.leave_type,
      //     leave_from: req.body.leave_from,
      //     leave_to: req.body.leave_to,
      //     category_code: req.body.category_code,
      //     detail: req.body.detail,

      //     leave_status: 1,
      //     datetime: date_now,
      //     approve_person: req.body.approve_person,
      //     approve_date: req.body.approve_date,
      // };
      db.sequelize
        .query(
          `INSERT INTO t_leave (leave_code, leave_person, classroom_code, leave_type, leave_from,leave_to,category_code,detail,leave_status,datetime,approve_person,approve_date) 
                        VALUES ('${result}', '${req.body.leave_person}', '${req.body.classroom_code}', '${req.body.leave_type}', '${req.body.leave_from}', '${req.body.leave_to}', '${req.body.category_code}',
                         '${req.body.detail}','1','${date_now}','${req.body.approve_person}','${req.body.approve_date}'
                        ) `,
          {
            type: QueryTypes.INSERT,
          }
        )
        .then((data) => {
          res
            .status(200)
            .send({ data: "Insert Data Successful", status: true });
        })
        .catch((err) => {
          res
            .status(200)
            .send({ msg: "Error", msgdescription: err.message, status: false });
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.moodle_mdl_user = (req, res) => {
  db_moodle.sequelize
    .query(`SELECT * FROM mdl_user`, {
      type: QueryTypes.SELECT,
    })

    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find student .`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving student " + err,
      });
    });
};
