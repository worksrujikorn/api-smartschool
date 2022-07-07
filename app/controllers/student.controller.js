const db = require("../models");
const db_moodle = require("../models/mdl_user");
const Op = db.Sequelize.Op;
const { QueryTypes } = require("sequelize");

const User = db.t_login;
const Parents = db.t_master_parent;
const Students = db.t_master_student;

// const sendMail = require("../middleware/sendMail");
var bcrypt = require("bcryptjs");

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
  // Save User to Database
  if (!req.body.student_idcard && !req.body.student_id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const register_student = {
    student_code: req.body.student_code,
    student_idcard: req.body.student_idcard,
    title: req.body.title,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    firstname_en: req.body.firstname_en,
    lastname_en: req.body.lastname_en,
    birthday: req.body.birthday,
    phonenumber: req.body.phonenumber,
    Address: req.body.Address,
    email: req.body.email,
    picture: req.body.picture,
    parent_1: req.body.parent_1,
    parent_2: req.body.parent_2,
    parent_3: req.body.parent_3,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    detail: req.body.detail,
    classroom_code: req.body.classroom_code,
    createdate: new Date(),
    who: req.body.who,
  };

  Students.create(register_student)
    .then((data) => {
      User.create({
        login_code: data.student_code,
        username: req.body.username,
        role: 4,
        password: bcrypt.hashSync(req.body.password, 4),
        createdate: new Date(),
        who: req.body.who,
      }).then((user) => {
        //   // user role = 1
        db_moodle.sequelize
          .query(
            `INSERT INTO mdl_user (auth,confirmed, policyagreed,deleted,suspended,mnethostid,username,password,idnumber,firstname,lastname,email,emailstop,phone1,phone2, institution,department,address,city,country,lang,calendartype,theme,timezone,firstaccess,lastaccess,lastlogin,currentlogin,lastip,secret,picture,description,descriptionformat,mailformat,maildigest,maildisplay,autosubscribe,trackforums,timecreated,timemodified) 
                  VALUES ('manual',1,0,0,0,1,'${
                    req.body.username
                  }' , '${bcrypt.hashSync(req.body.password,12)}',idnumber,'${
              req.body.firstname
            }','${req.body.lastname}','${req.body.email}',0,
                    '${
                      req.body.phonenumber
                    }','', '','','','','TH','en','gregorian','',99,0,0,0,0,'','','0','',1,1,0,2,1,0,0,0)`,

            {
              type: QueryTypes.INSERT,
            }
          )
          .then((moodle) => {
            res.status(200).send({ message: "success", data: data });
          })
          .catch((moodle_err) => {
            res.status(200).send({
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
  const update_student = {
    student_code: req.body.student_code,
    student_idcard: req.body.student_idcard,
    title: req.body.title,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    firstname_en: req.body.firstname_en,
    lastname_en: req.body.lastname_en,
    birthday: req.body.birthday,
    phonenumber: req.body.phonenumber,
    Address: req.body.Address,
    email: req.body.email,
    picture: req.body.picture,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    detail: req.body.detail,
    classroom_code: req.body.classroom_code,
    createdate: new Date(),
    who: req.body.who,
  };
  const password_student = {
    password: bcrypt.hashSync(req.body.password, 4),
  };
  Students.update(update_student, {
    where: { student_code: id },
  })

    .then((num) => {
      if (num == 1) {
        User.update(password_student, {
          where: { login_code: id },
        }).then((num) => {
          
            res.send({
              message: "Student was updated successfully.",
            });
          
        });
      } else {
        res.send({
          message: `Cannot update Student with id = ${id}. Maybe Student was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Student with id=" + id,
      });
    });
};

exports.findAll = (req, res) => {
  Students.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Students.findAll({ where: { student_code: id } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find student with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving student with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Students.destroy({
    where: { student_code: id },
  })
    .then((num) => {
        db.sequelize
        .query(
          `DELETE FROM t_login
                    WHERE login_code  = '${id}'
                    `,
          {
            type: QueryTypes.DELETE,
           
          }
        );

      db.sequelize
        .query(
          `DELETE FROM t_login
                    where login_code IN (
                      SELECT  parent_code FROM t_master_parent
                      WHERE student_code = '${id}'
                    )`,
          {
            type: QueryTypes.DELETE,
           
          }
        )
        .then((res) => {
          Parents.destroy({
            where: { student_code: id },
          })
            .then((res_) => {
                
              res
                .status(200)
                .send({ Msg: "Delete Successfully", status: true });
            })
            .catch((err) => {
              res.status(500).send({
                message: "Could not delete Parent with student_code=" + id,
              });
            });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Could not delete Parent with student_code=" + id,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        description:err.message
      });
    });
};

exports.classroom_student = async (req, res) => {
  // date_ob = new Date();
  // const date_now = con_date_now(date_ob);
  db.sequelize
    .query(
      `SELECT tms.student_code, tms.title ,tms.firstname_en ,tms.lastname_en,tms.firstname,tms.lastname ,tms.phonenumber,
        tms.score,tms.birthday,tms.picture,tms.classroom_code,
        tmc.classroom_name 
              FROM t_master_classroom tmc
              JOIN t_master_student tms on tms.classroom_code = tmc.classroom_code
                   
      WHERE tmc.classroom_code  = '${req.body.classroom_code}'`,
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


    // db.sequelize
    // .query(
    //   `SELECT tms.student_code, tms.title ,tms.firstname_en ,tms.lastname_en,tms.firstname,tms.lastname ,tms.phonenumber,
    //     tms.score,tms.birthday,tms.picture,tms.classroom_code,tc.comment_detail,tc.detail,
    //     tmc.classroom_name 
    //           FROM t_master_classroom tmc
    //           JOIN t_master_student tms on tms.classroom_code = tmc.classroom_code
    //                 LEFT JOIN t_comment tc on tc.student_code = tms.student_code
    //   WHERE tmc.classroom_code  = '${req.body.classroom_code}'`,
    //   {
    //     type: QueryTypes.SELECT,
    //   }
    // )
    // .then((_res) => {
    //   res.send(_res);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
};

exports.studentscore = async (req, res) => {
  const id = req.params.id;
  db.sequelize
    .query(
      `SELECT student_code, score FROM t_master_student
        WHERE student_code = '${id}'`,
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

exports.studenttime = async (req, res) => {
  date_ob = new Date();
  const date_now = con_date_now(date_ob);
  const id = req.params.id;
  db.sequelize
    .query(
      `
            SELECT tms.student_code, scan_status, CAST(cf.timein as time) as timein , CAST(cf.time_line as time) as timeline, CAST(cf.timeout as time) as timeout 
            FROM checkin_facescan cf 
            JOIN  t_master_student tms on tms.student_code = cf.facescan_code
            WHERE CAST(cf.timein as date) = '${date_now}' AND cf.facescan_code = '${id}'
    
            `,
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

exports.studentsubjects = async (req, res) => {
  date_ob = new Date();
  const date_now = con_date_now(date_ob);
  db.sequelize
    .query(
      `SELECT COUNT(*) as All_Subject,(SELECT COUNT(*) as Subject_Done FROM checkin_classroom
        WHERE student_code = '${req.body.student_code}' AND CAST(datetime as date) = '${date_now}') as  Subject_Done
        FROM t_schedule
        WHERE classroom_code = '${req.body.classroom_code}' AND date = '${req.body.date}'`,
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
