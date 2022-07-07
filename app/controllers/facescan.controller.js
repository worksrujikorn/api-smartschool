const axios = require("axios");
const moment = require("moment");
const db = require("../models");
const Op = db.Sequelize.Op;
const facescan = db.t_master_facescan;
const { QueryTypes } = require("sequelize");

exports.getallfacescan = async (req, res) => {
  const name = req.params.name;
  db.sequelize
    .query(
      `SELECT ip_facescan_id, ip, serial_number, name_facescan, name_school, type FROM t_master_ip_facescan WHERE name_school LIKE '%${name}%'`,
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



exports.receivefacescan = async (req, res) => {
  console.log(req.body);
  time = moment(req.body[0].datetime).format("HH:mm");
  date = moment(req.body[0].datetime).format("YYYY-MM-DD");


  if (time <= "17:30") {
    db.sequelize
      .query(
        `SELECT COUNT(*) as cnt FROM checkin_facescan 
                          WHERE facescan_code = '${req.body[0].data.personId}'
                          and CAST(timein as date) = '${date}'`,
        {
          type: QueryTypes.SELECT,
        }
      )

      .then((data) => {

        db.sequelize.query(
          `select school_year_id  from 
           t_master_school_year    WHERE ('${date}'  BETWEEN CAST(school_year_start as date )   AND  CAST(school_year_end as date )) `
          , {
            type: QueryTypes.SELECT,
          }
        ).then((data_) => {
          console.log('data', data_)
          console.log('school_year_id', data_[0].school_year_id)


          if (data[0].cnt < 1) {
            db.sequelize
              .query(
                `INSERT INTO checkin_facescan (facescan_code, timein, scan_status , school_year_id  ) VALUES ('${req.body[0].data.personId}' , '${req.body[0].datetime}', 'F' , ${data_[0].school_year_id} )`,
                {
                  type: QueryTypes.INSERT,
                }
              )
              .then((data) => {
                console.log(data[0]);
                res.status(200).send({ Msg: "Checkin Success", Status: true });
                db.sequelize
                  .query(
                    `SELECT CONCAT(tms.title, '', tms.firstname, '  ', tms.lastname) as Fullname, DATE_FORMAT(cf.timein,'%d/%m/%y %H:%i:%s') as date 
                      FROM checkin_facescan cf 
                      JOIN t_master_student tms ON tms.student_code = cf.facescan_code
                      WHERE cf.checkin_facescan_id = '${data[0]}'`,
                    {
                      type: QueryTypes.SELECT,
                    }
                  )
                  .then((data_res) => {
                    console.log(data_res)

                    db.sequelize
                      .query(
                        `SELECT  *  FROM t_master_student tms    JOIN  t_master_parent tmp on tmp.student_code = tms.student_code 
                        WHERE tms.student_code =   '${req.body[0].data.personId}'`,
                        {
                          type: QueryTypes.SELECT,
                        }
                      )
                      .then((data_res_) => {
                        console.log(data_res_)
                        for (i = 0; i < data_res_.length; i++) {
                          let data_parent = data_res_[i].parent_code
                          db.sequelize

                            .query(
                              `SELECT * FROM user_token WHERE user_code = "${data_parent}"`,
                              {
                                type: QueryTypes.SELECT,
                              }
                            ).then((data4_) => {
                              // console.log('data_parent', data_parent)
                              // console.log(news_subject_noti);
                              // console.log(data4_.length)
                              for (let index2 = 0; index2 < data4_.length; index2++) {

                                if (data4_[0] != undefined) {

                                  console.log(data4_[index2].token)
                                  axios({
                                    method: "post",
                                    url: "https://exp.host/--/api/v2/push/send",
                                    data: {
                                      to: [
                                        data4_[index2].token
                                      ],
                                      title: "เช็คชื่อเข้าเรียน",
                                      body: `${data_res[0].Fullname} เวลาเข้าเรียน ${data_res[0].date}`,
                                    },
                                  });
                                }

                              }


                            })


                        }

                        // axios({
                        //   method: "post",
                        //   url: "https://exp.host/--/api/v2/push/send",
                        //   data: {
                        //     to: [
                        //       "ExponentPushToken[HVHeWTHQac-SlH_optGi5C]",
                        //       "ExponentPushToken[J7ksObDIqbcYEbQhv_v2F6]",
                        //     ],
                        //     title: "เช็คชื่อเข้าเรียน",
                        //     body: `${data_res[0].Fullname} เวลาเข้าเรียน ${data_res[0].date}`,
                        //   },
                        // });
                      })
                      .catch((err) => {
                        res.status(200).send({ Msg: "Error", Status: false });
                        console.log(err);
                      });

                  })
                  .catch((err) => {
                    res.status(200).send({ Msg: "Error", Status: false });
                    console.log(err);
                  });
              })
              .catch((err) => {
                res.status(200).send({ Msg: "Error", Status: false });
                console.log(err);
              });
          } else {
            res.status(200).send({ Msg: "User Already Checkin", Status: true });
          }


        })



      })
      .catch((err) => {
        res.send({ Msg: "Error", Status: false });
        console.log(err);
      });
  } else {
    db.sequelize
      .query(
        `SELECT COUNT(*)  as cnt, checkin_facescan_id FROM checkin_facescan 
                          WHERE facescan_code = '${req.body[0].data.personId}'
                          and CAST(timein as date) = '${date}'`,
        {
          type: QueryTypes.SELECT,
        }
      )
      .then((data) => {
        if (data[0].cnt == 1) {
          db.sequelize
            .query(
              `UPDATE checkin_facescan SET timeout = '${req.body[0].datetime}' WHERE checkin_facescan_id = ${data[0].checkin_facescan_id}`,
              {
                type: QueryTypes.UPDATE,
              }
            )
            .then((result) => { //data ชื่อมันทับกัน
              // console.log(data[0].checkin_facescan_id)
              res.status(200).send({ Msg: "Checkout Success", Status: true });
              db.sequelize
                .query(
                  `SELECT CONCAT(tms.title, '', tms.firstname, '  ', tms.lastname) as Fullname, DATE_FORMAT(cf.timeout,'%d/%m/%y %H:%i:%s') as date 
                FROM checkin_facescan cf 
                JOIN t_master_student tms ON tms.student_code = cf.facescan_code
                WHERE cf.checkin_facescan_id = '${data[0].checkin_facescan_id}'`,
                  {
                    type: QueryTypes.SELECT,
                  }
                )
                .then((data_res) => {

                  console.log(data_res)

                  db.sequelize
                    .query(
                      `SELECT  *  FROM t_master_student tms    JOIN  t_master_parent tmp on tmp.student_code = tms.student_code 
                      WHERE tms.student_code =   '${req.body[0].data.personId}'`,
                      {
                        type: QueryTypes.SELECT,
                      }
                    )
                    .then((data_res_) => {
                      console.log(data_res_)
                      for (i = 0; i < data_res_.length; i++) {
                        let data_parent = data_res_[i].parent_code
                        db.sequelize

                          .query(
                            `SELECT * FROM user_token WHERE user_code = "${data_parent}"`,
                            {
                              type: QueryTypes.SELECT,
                            }
                          ).then((data4_) => {
                            // console.log('data_parent', data_parent)
                            // console.log(news_subject_noti);
                            // console.log(data4_.length)
                            for (let index2 = 0; index2 < data4_.length; index2++) {

                              if (data4_[0] != undefined) {

                                console.log(data4_[index2].token)
                                axios({
                                  method: "post",
                                  url: "https://exp.host/--/api/v2/push/send",
                                  data: {
                                    to: [
                                      data4_[index2].token
                                    ],
                                    title: "เช็คชื่อออกเรียน",
                                    body: `${data_res[0].Fullname} เวลาเข้าเรียน ${data_res[0].date}`,
                                  },
                                });
                              }

                            }


                          })


                      }
                    })
                    .catch((err) => {
                      res.status(200).send({ Msg: "Error", Status: false });
                      console.log(err);
                    });

                  // console.log(data_res[0])
                  // axios({
                  //   method: "post",
                  //   url: "https://exp.host/--/api/v2/push/send",
                  //   data: {
                  //     to: [
                  //       "ExponentPushToken[HVHeWTHQac-SlH_optGi5C]",
                  //       "ExponentPushToken[J7ksObDIqbcYEbQhv_v2F6]",
                  //     ],
                  //     title: "เช็คชื่อออกเรียน",
                  //     body: `${data_res[0].Fullname} เวลาออกเรียน ${data_res[0].date}`,
                  //   },
                  // });
                })

            })
            .catch((err) => {
              res.status(200).send({ Msg: "Error", Status: false });
              console.log(err);
            });
        } else {
          res.status(200).send({ Msg: "User Already Checkout", Status: true });
        }
      })
      .catch((err) => {
        res.send({ Msg: "Error", Status: false });
        console.log(err);
      });
  }
};

exports.receivefacescan_by_admin = async (req, res) => {
  console.log(req.body);
  time = moment(req.body[0].datetime).format("HH:mm");
  date = moment(req.body[0].datetime).format("YYYY-MM-DD");
  if (time <= "16:00") {
    db.sequelize
      .query(
        `SELECT COUNT(*) as cnt FROM checkin_facescan 
                          WHERE facescan_code = '${req.body[0].data.personId}'
                          and CAST(timein as date) = '${date}'`,
        {
          type: QueryTypes.SELECT,
        }
      )
      .then((data) => {

        db.sequelize.query(
          `select school_year_id  from 
           t_master_school_year    WHERE ('${date}'  BETWEEN CAST(school_year_start as date )   AND  CAST(school_year_end as date )) `
          , {
            type: QueryTypes.SELECT,
          }
        ).then((data_) => {

          console.log('school_year_id', data_[0].school_year_id)


          if (data[0].cnt < 1) {

            let query = `INSERT INTO checkin_facescan (facescan_code, timein, scan_status , school_year_id ,who ,description  ) VALUES ('${req.body[0].data.personId}' , '${req.body[0].datetime}', 'F' , ${data_[0].school_year_id} , '${req.body[0].data.who}','${req.body[0].data.description}')`
            console.log(query);
            db.sequelize
              .query(
                query,
                {
                  type: QueryTypes.INSERT,
                }
              )
              .then((data) => {
                console.log(data[0]);
                res.status(200).send({ Msg: "Checkin Success", Status: true });
                db.sequelize
                  .query(
                    `SELECT CONCAT(tms.title, '', tms.firstname, '  ', tms.lastname) as Fullname, DATE_FORMAT(cf.timein,'%d/%m/%y %H:%i:%s') as date 
                      FROM checkin_facescan cf 
                      JOIN t_master_student tms ON tms.student_code = cf.facescan_code
                      WHERE cf.checkin_facescan_id = '${data[0]}'`,
                    {
                      type: QueryTypes.SELECT,
                    }
                  )
                  .then((data_res) => {
                
                    console.log(data_res)

                    db.sequelize
                      .query(
                        `SELECT  *  FROM t_master_student tms    JOIN  t_master_parent tmp on tmp.student_code = tms.student_code 
                        WHERE tms.student_code =   '${req.body[0].data.personId}'`,
                        {
                          type: QueryTypes.SELECT,
                        }
                      )
                      .then((data_res_) => {
                        console.log(data_res_)
                        for (i = 0; i < data_res_.length; i++) {
                          let data_parent = data_res_[i].parent_code
                          db.sequelize
  
                            .query(
                              `SELECT * FROM user_token WHERE user_code = "${data_parent}"`,
                              {
                                type: QueryTypes.SELECT,
                              }
                            ).then((data4_) => {
                              // console.log('data_parent', data_parent)
                              // console.log(news_subject_noti);
                              // console.log(data4_.length)
                              for (let index2 = 0; index2 < data4_.length; index2++) {
  
                                if (data4_[0] != undefined) {
  
                                  console.log(data4_[index2].token)
                                  axios({
                                    method: "post",
                                    url: "https://exp.host/--/api/v2/push/send",
                                    data: {
                                      to: [
                                        data4_[index2].token
                                      ],
                                      title: "เช็คชื่อเข้าเรียน",
                                      body: `${data_res[0].Fullname} เวลาเข้าเรียน ${data_res[0].date}`,
                                    },
                                  });
                                }
  
                              }
  
  
                            })
  
  
                        }
                      })
                      .catch((err) => {
                        res.status(200).send({ Msg: "Error", Status: false });
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    res.status(200).send({ Msg: "Error", Status: false });
                    console.log(err);
                  });
              })
              .catch((err) => {
                res.status(200).send({ Msg: "Error", Status: false });
                console.log(err);
              });
          } else {
            res.status(200).send({ Msg: "User Already Checkin", Status: true });
          }


        })



      })
      .catch((err) => {
        res.send({ Msg: "Error", Status: false });
        console.log(err);
      });
  }
};

exports.receivefacescanteacher = async (req, res) => {
  console.log(req.body);
  time = moment(req.body[0].datetime).format("HH:mm");
  date = moment(req.body[0].datetime).format("YYYY-MM-DD");
  if (time <= "16:00") {
    db.sequelize
      .query(
        `SELECT COUNT(*) as cnt FROM checkin_facescan_teacher 
                          WHERE facescan_code = '${req.body[0].data.personId}'
                          and CAST(timein as date) = '${date}'`,
        {
          type: QueryTypes.SELECT,
        }
      )
      .then((data) => {

        db.sequelize.query(
          `select school_year_id  from 
           t_master_school_year    WHERE ('${date}'  BETWEEN CAST(school_year_start as date )   AND  CAST(school_year_end as date )) `
          , {
            type: QueryTypes.SELECT,
          }
        ).then((data_) => {

          console.log('school_year_id', data_[0].school_year_id)


          if (data[0].cnt < 1) {
            db.sequelize
              .query(
                `INSERT INTO checkin_facescan_teacher (facescan_code, timein, scan_status ,school_year_id ) VALUES ('${req.body[0].data.personId}' , '${req.body[0].datetime}', 'N' , '${data_[0].school_year_id}')`,
                {
                  type: QueryTypes.INSERT,
                }
              )
              .then((data) => {
                res.status(200).send({ Msg: "Checkin Success", Status: true });
              })
              .catch((err) => {
                res.status(200).send({ Msg: "Error", Status: false });
                console.log(err);
              });
          } else {
            res.status(200).send({ Msg: "User Already Checkin", Status: true });
          }



        })


      })
      .catch((err) => {
        res.send({ Msg: "Error", Status: false });
        console.log(err);
      });
  } else {
    db.sequelize
      .query(
        `SELECT COUNT(*)  as cnt, checkin_facescan_id FROM checkin_facescan_teacher 
                          WHERE facescan_code = '${req.body[0].data.personId}'
                          and CAST(timein as date) = '${date}'`,
        {
          type: QueryTypes.SELECT,
        }
      )
      .then((data) => {
        if (data[0].cnt == 1) {
          db.sequelize
            .query(
              `UPDATE checkin_facescan_teacher SET timeout = '${req.body[0].datetime}' WHERE checkin_facescan_id = ${data[0].checkin_facescan_id}`,
              {
                type: QueryTypes.UPDATE,
              }
            )
            .then((data) => {
              res.status(200).send({ Msg: "Checkout Success", Status: true });
            })
            .catch((err) => {
              res.status(200).send({ Msg: "Error", Status: false });
              console.log(err);
            });
        } else {
          res.status(200).send({ Msg: "User Already Checkout", Status: true });
        }
      })
      .catch((err) => {
        res.send({ Msg: "Error", Status: false });
        console.log(err);
      });
  }
};


exports.receivefacescanteacher_by_admin = async (req, res) => {
  console.log(req.body);
  time = moment(req.body[0].datetime).format("HH:mm");
  date = moment(req.body[0].datetime).format("YYYY-MM-DD");
  if (time <= "16:00") {
    db.sequelize
      .query(
        `SELECT COUNT(*) as cnt FROM checkin_facescan_teacher 
                          WHERE facescan_code = '${req.body[0].data.personId}'
                          and CAST(timein as date) = '${date}'`,
        {
          type: QueryTypes.SELECT,
        }
      )
      .then((data) => {

        db.sequelize.query(
          `select school_year_id  from 
           t_master_school_year    WHERE ('${date}'  BETWEEN CAST(school_year_start as date )   AND  CAST(school_year_end as date )) `
          , {
            type: QueryTypes.SELECT,
          }
        ).then((data_) => {

          console.log('school_year_id', data_[0].school_year_id)


          if (data[0].cnt < 1) {
            db.sequelize
              .query(
                `INSERT INTO checkin_facescan_teacher (facescan_code, timein, scan_status ,school_year_id  ,who , description) VALUES ('${req.body[0].data.personId}' , '${req.body[0].datetime}', 'N' , '${data_[0].school_year_id}', '${req.body[0].data.who}', '${req.body[0].data.description}')`,
                {
                  type: QueryTypes.INSERT,
                }
              )
              .then((data) => {
                res.status(200).send({ Msg: "Checkin Success", Status: true });
              })
              .catch((err) => {
                res.status(200).send({ Msg: "Error", Status: false });
                console.log(err);
              });
          } else {
            res.status(200).send({ Msg: "User Already Checkin", Status: true });
          }



        })


      })
      .catch((err) => {
        res.send({ Msg: "Error", Status: false });
        console.log(err);
      });
  }

};