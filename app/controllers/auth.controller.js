const db = require("../models");
const config = require("../config/auth.config");
const { QueryTypes } = require('sequelize');
const User = db.t_login;
const Role = db.t_master_role;
const Student = db.t_master_student
const Teacher = db.t_master_teacher
const token_update = db.t_master_login;

const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = (req, res) => {

  // Save User to Database
  User.create({
    username: req.body.username,
    login_id: req.body.login_id,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role,
    createdate: new Date(),
    who: req.body.who
  })
    .then(user => {
      res.status(200).send({ message: 'success  ', data: user });

      // if (req.body.role) {
      //   console.log('req.body.role', req.body.role)
      //   Role.findAll({
      //     where: {
      //       role_id: {
      //         [Op.or]: req.body.role
      //       }
      //     }
      //   }).then(role => {
      //     console.log('role', role);

      //     user.setRoles(role).then(() => {
      //       res.send({ message: "User was registered successfully!" });
      //     });

      //   });
      // }
      // else { 
      // user.setRoles([3]).then(() => {
      //   res.send({ message: "User was registered successfully!" });
      // });
      //       }

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.signin = (req, res) => {
  // ตัวอย่าง ค้นหา user  select * from user where username = 'admin'
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      db.sequelize
        .query(
          `UPDATE t_login SET token = '${token}' WHERE login_id = ${user.login_id}`,
          {
            type: QueryTypes.UPDATE,
          }
        )
        .then((data) => {

          res.status(200).send({
            id: user.login_id,
            login_id: user.login_code,
            username: user.username,
            email: user.email,
            role: user.role,

            // roles: authorities,
            accessToken: token
          });

        })
        .catch((err) => {
          res.send({ Msg: "Error", Status: false });
          console.log(err);
        });






    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.Saveimage = (req, res) => {
  console.log(req.body.name, req.body.type, req.body.register);
  res.send({ success: true, data: "https://api.noodee.net/api/smartschool/" + req.body.type + "/" + req.body.name + '-' + req.file.originalname });
};


