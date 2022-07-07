const db = require("../models");
const axios = require("axios");
const Op = db.Sequelize.Op;
const { QueryTypes } = require("sequelize");
const code = require("./gencode.controller.js");
const News = db.t_news;
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
  if (!req.body.news_code && !req.body.news_subject) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  db.sequelize
    .query(`SELECT MAX(news_code)  as maxid FROM t_news`, {
      type: QueryTypes.SELECT,
    })
    .then((_res) => {
      let id = _res[0].maxid.substring(1);
      let txt = _res[0].maxid.substring(0, 1);

      let num = parseInt(id);
      let len = String(id).length;
      let result = code.gencode(num, txt, len);
      // Create a parent
      console.log(result);
      let news_subject_noti = req.body.news_subject;
      // Save Parent in the database
      const register_news = {
        news_code: result,
        news_subject: req.body.news_subject,
        news_detail: req.body.news_detail,
        news_picture: req.body.news_picture,
        news_start: req.body.news_start,
        news_end: req.body.news_end,
        news_status: req.body.news_status,
        createdate: new Date(),
        who: req.body.who,
      };

      News.create(register_news)
        .then((data) => {
          res.status(200).send({ message: "success", data: data });
          db.sequelize
            .query(`SELECT teacher_code  FROM t_master_teacher`, {
              type: QueryTypes.SELECT,
            })
            .then((data1) => {

              for (i = 0; i < data1.length; i++) {
                // console.log(data1[i].teacher_code)
                let teacher_code = data1[i].teacher_code;
                db.sequelize

                  .query(
                    `INSERT INTO news_noti (news_code, login_code,newsnoti_status) VALUES ('${result}' , '${teacher_code}', '0')`,
                    {
                      type: QueryTypes.INSERT,
                    }
                  )
                  .then((data2) => {

                    db.sequelize

                      .query(
                        `SELECT * FROM user_token WHERE user_code = "${teacher_code}"`,
                        {
                          type: QueryTypes.SELECT,
                        }
                      ).then((data2_) => {
                        console.log('teacher', teacher_code)
                        console.log(news_subject_noti);
                        if (data2_[0] != undefined) {

                          axios({
                            method: "post",
                            url: "https://exp.host/--/api/v2/push/send",
                            data: {
                              to: [
                                data2_[0].token
                              ],
                              title: "ประกาศข่าวประชาสัมพันธ์",
                              body: ` เรื่อง  ${news_subject_noti}`,
                            },
                          });
                        }

                      })




                    console.log(data2)
                  })
                  .catch((err2) => {
                    console.log(err2);
                  });


              }


            })
            .catch((err1) => {
              console.log(err1);
            });
          db.sequelize
            .query(`SELECT student_code  FROM t_master_student`, {
              type: QueryTypes.SELECT,
            })
            .then((data3) => {

              for (i = 0; i < data3.length; i++) {
                console.log(data3[i].student_code)
                let student_noti = data3[i].student_code;
                db.sequelize

                  .query(
                    `INSERT INTO news_noti (news_code, login_code,newsnoti_status) VALUES ('${result}' , '${student_noti}', '0')`,
                    {
                      type: QueryTypes.INSERT,
                    }
                  )
                  .then((data4) => {

                    db.sequelize

                      .query(
                        `SELECT * FROM user_token WHERE user_code = "${student_noti}"`,
                        {
                          type: QueryTypes.SELECT,
                        }
                      ).then((data4_) => {
                        console.log('student_noti', student_noti)
                        console.log(news_subject_noti);
                        if (data4_[0] != undefined) {

                          axios({
                            method: "post",
                            url: "https://exp.host/--/api/v2/push/send",
                            data: {
                              to: [
                                data4_[0].token
                              ],
                              title: "ประกาศข่าวประชาสัมพันธ์",
                              body: ` เรื่อง  ${news_subject_noti}`,
                            },
                          });
                        }

                      })




                    console.log(data4)
                  })
                  .catch((err4) => {
                    console.log(err4);
                  });

              }


            })
            .catch((err3) => {
              console.log(err3);
            });
          db.sequelize
            .query(`SELECT parent_code  FROM t_master_parent`, {
              type: QueryTypes.SELECT,
            })
            .then((data5) => {

              for (i = 0; i < data5.length; i++) {
                console.log(data5[i].parent_code)

                let parent_noti = data5[i].parent_code
                db.sequelize

                  .query(
                    `INSERT INTO news_noti (news_code, login_code,newsnoti_status) VALUES ('${result}' , '${parent_noti}', '0')`,
                    {
                      type: QueryTypes.INSERT,
                    }
                  )
                  .then((data5) => {

                    db.sequelize

                      .query(
                        `SELECT * FROM user_token WHERE user_code = "${parent_noti}"`,
                        {
                          type: QueryTypes.SELECT,
                        }
                      ).then((data5_) => {
                        console.log('parent_noti', parent_noti)
                        console.log(news_subject_noti);
                        // console.log(data5_.length);

                        if (data5_[0] != undefined) {
                          for (let index1 = 0; index1 < data5_.length; index1++) {
                            axios({
                              method: "post",
                              url: "https://exp.host/--/api/v2/push/send",
                              data: {
                                to: [
                                  data5_[index1].token
                                ],
                                title: "ประกาศข่าวประชาสัมพันธ์",
                                body: ` เรื่อง  ${news_subject_noti}`,
                              },
                            });

                          }
                          // console.log(data5_)


                        }

                      })




                    // console.log(data5)
                    
                  })
                  .catch((err6) => {
                    console.log(err6);
                  });
              }


            })
            .catch((err3) => {
              console.log(err3);
            });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const update_news = {
    news_id: req.body.news_id,
    news_code: req.body.news_code,
    news_subject: req.body.news_subject,
    news_detail: req.body.news_detail,
    news_picture: req.body.news_picture,
    news_start: req.body.news_start,
    news_end: req.body.news_end,
    news_status: req.body.news_status,
    createdate: new Date(),
    who: req.body.who,
  };
  News.update(update_news, {
    where: { news_id: id },
  })

    .then((num) => {
      if (num == 1) {
        res.send({
          message: "News was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update News with id = ${id}. Maybe News was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error updating News with id=" + id,
      });
    });
};

exports.findAll = (req, res) => {
  News.findAll()
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
  News.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find News with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving News with id=" + id,
      });
    });
};

exports.findAll_Date = (req, res) => {
  date_ob = new Date();
  const date_now = con_date_now(date_ob);
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

exports.findAll_Status = (req, res) => {
  date_ob = new Date();
  const date_now = con_date_now(date_ob);
  db.sequelize
    .query(
      `	SELECT tn.news_code , tn.news_subject,tn.news_detail,tn.news_picture,tn.news_start,tn.news_end,tn.news_status,noti.newsnoti_status FROM t_news tn
      JOIN news_noti noti on noti.news_code = tn.news_code    
      WHERE ('${date_now}'  BETWEEN CAST(news_start as date )   AND  CAST(news_end as date )) AND  noti.login_code = "${req.body.login_code}"  `,
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
exports.CountAll_Date = (req, res) => {
  date_ob = new Date();
  const date_now = con_date_now(date_ob);
  db.sequelize
    .query(
      `SELECT COUNT(login_code) as cnt
      FROM news_noti 
      WHERE 
      login_code = '${req.body.login_code}'
      AND
      newsnoti_status = '0'`,
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

exports.delete = (req, res) => {
  const id = req.params.id;
  News.destroy({
    where: { news_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "News was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete News with id=${id}. Maybe News was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete News with id=" + id,
      });
    });
};
