const db = require("../models");
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');
const config = require("../config/auth.config");
const t_notification = db.t_notification;
var jwt = require("jsonwebtoken");

exports.notifications_send = async (req, res) => {
    if (!req.body.Username) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a parent
    const send_noti = {
        Username: req.body.Username,
        Category: req.body.Category,
        Message: req.body.Message,
        createdate: new Date(),
        who: req.body.who
    };
    // Save Parent in the database
    t_notification.create(send_noti)
        .then(data => {


            res.status(200).send({ message: 'success', data: data });

        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the parent."
            });
        });
};


exports.notifications_list = async (req, res) => {
    db.sequelize
        .query(
            `SELECT notification_id, Username, Category, Message, createdate FROM t_notification
        WHERE Username = '${req.body.Username}'
        Order by Createdate desc
        Limit ${req.body.limit}`,
            { type: QueryTypes.SELECT }
        )
        .then((_res) => {
            res.send({ data: _res, "status": true });
        })
        .catch((err) => {
            res.send({ "msg": "no data found", "status": false });
            console.log(err);
        });
};


exports.notifications_news = async (req, res) => {
    db.sequelize
        .query(`UPDATE news_noti SET newsnoti_status = '1'  WHERE news_code = '${req.body.news_code}' and login_code =  '${req.body.login_code}'`, {
            type: QueryTypes.UPDATE,
        })
        .then((_res) => {



            res.send({ data: _res, "status": true });

        }
        )
        .catch((err) => {
            res.send({ "msg": "no data found", "status": false });
            console.log(err);
        });
};




exports.notifications_login = async (req, res) => {

    // var token = jwt.sign({ id: req.body.user_code }, config.secret, {
    //     expiresIn: 86400 * 365 // 24 hours
    // });
    // console.log(token);
    let query = `INSERT INTO user_token (user_code, token) 
    VALUES ('${req.body.user_code}' , '${req.body.token}') returning *`
    console.log(query)
    db.sequelize
        .query(
            query,
            {
                type: QueryTypes.SELECT,
            }
        )
        .then((_res) => {
            console.log(_res)
            res.send({ data: _res, "status": true });

        }
        )
        .catch((err) => {
            res.send({ "msg": "no data found", "status": false });
            console.log(err);
        });
};

exports.notifications_logout = async (req, res) => {

    db.sequelize
        .query(
            `DELETE FROM user_token
                WHERE id_token  = '${req.body.id_token}'
                `,
            {
                type: QueryTypes.DELETE,

            }
        )
        .then((_res) => {

            console.log(_res)
            if (_res == undefined) {
                res.send({ "msg": "no data found", "status": false });
            } else {

                res.send({ data: _res, "status": true });
            }

        }
        )
        .catch((err) => {
            res.send({ "msg": "no data found", "status": false });
            console.log(err);
        });
};

exports.notifications_select = (req, res) => {

    db.sequelize
        .query(
            `	SELECT id_token , token , user_code  FROM user_token  `,
            { type: QueryTypes.SELECT }
        )
        .then((data) => {
            console.log(data)
            res.send(data);
        })
        .catch((err) => {
            res.send({ msg: "no data found", status: false });
            console.log(err);
        });
};


exports.notifications_chkout = (req, res) => {

    db.sequelize
    .query(
      `SELECT * FROM checkin_facescan cf JOIN t_master_student tms on cf.facescan_code = tms.student_code JOIN t_master_teacher tmt on tmt.classroom_code = tms.classroom_code
      WHERE    CAST(cf.timein as date) = "2022-05-05" and cf.timeout is null GROUP BY tmt.classroom_code`,
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

exports.notifications_teacher = (req, res) => {

    db.sequelize
    .query(
      `SELECT * FROM checkin_facescan cf JOIN t_master_student tms on cf.facescan_code = tms.student_code JOIN t_master_teacher tmt on tmt.classroom_code = tms.classroom_code
      WHERE    CAST(cf.timein as date) = "2022-05-05" and cf.timeout is null and tmt.teacher_code = "${req.body.teacher_code}"`,
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