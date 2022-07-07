const db_moodle = require("../models/mdl_user");
const Op = db_moodle.Sequelize.Op;
const { QueryTypes } = require('sequelize');
// const User = db.t_login;

// const mdl_user = db.mdl_user;
// const sendMail = require("../middleware/sendMail");
var bcrypt = require("bcryptjs");
 

exports.get_mdl_user = (req, res) => {

    db_moodle.sequelize
        .query(`SELECT * FROM mdl_user`, {
            type: QueryTypes.SELECT,
        })


        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find student .`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving student " + err
            });
        });
};