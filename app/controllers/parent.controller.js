const db = require("../models");
const Op = db.Sequelize.Op;
const Parents = db.t_master_parent;
const code = require("./gencode.controller.js");
const { QueryTypes } = require("sequelize");
const User = db.t_login;
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

exports.create = async (req, res) => {
  console.log(req.body);
  let arr_parentcode = [];
  for await (const iterator of req.body) {
    if (iterator.parent_code) {
      arr_parentcode.push(iterator.parent_code);
    }
  }
  console.log("5555555555", arr_parentcode);
  if (arr_parentcode.length > 0) {
    await db.sequelize.query(
      `DELETE FROM t_login
      where login_code IN (
        SELECT  parent_code FROM t_master_parent
        WHERE student_code = '${req.body[0].student_code}' AND parent_code NOT IN (:parent_code)
      )`,
      {
        type: QueryTypes.DELETE,
        replacements: { parent_code: arr_parentcode },
      }
    );
    await db.sequelize.query(
      `DELETE FROM t_master_parent WHERE student_code = '${req.body[0].student_code}' AND parent_code NOT IN (:parent_code) `,
      {
        type: QueryTypes.DELETE,
        replacements: { parent_code: arr_parentcode },
      }
    );
    
  }

  date_ob = new Date();
  const date_now = con_datetime_now(date_ob);
  for (const iterator of req.body) {
    if (iterator.parent_code) {
      const update_parent = {
        parent_code: iterator.parent_code,
        parent_idcard: iterator.parent_idcard,
        title: iterator.title,
        firstname: iterator.firstname,
        lastname: iterator.lastname,
        phonenumber: iterator.phonenumber,
        Address: iterator.Address,
        email: iterator.email,
        picture: iterator.picture,
        username: iterator.username,
        password: iterator.password,
        role: iterator.role,
        detail: iterator.detail,
        createdate: iterator.createdate,
        who: iterator.who,
      };
      Parents.update(update_parent, {
        where: { parent_code: iterator.parent_code },
      })
        .then((num) => {
          
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Parent with id=" + iterator.parent_code,
          });
        });
    } else {
      await db.sequelize
        .query(`SELECT MAX(parent_code)  as maxid FROM t_master_parent`, {
          type: QueryTypes.SELECT,
        })
        .then(async (_res) => {
          let id = _res[0].maxid.substring(1, 8);
          let txt = _res[0].maxid.substring(0, 1);
          let num = parseInt(id);
          let len = String(id).length;
          let result = await code.gencode(num, txt, len);

          const register_parent = {
            student_code: iterator.student_code,
            parent_code: result,
            parent_idcard: iterator.parent_idcard,
            title: iterator.title,
            firstname: iterator.firstname,
            lastname: iterator.lastname,
            phonenumber: iterator.phonenumber,
            Address: iterator.Address,
            email: iterator.email,
            picture: iterator.picture,
            username: iterator.username,
            password: iterator.password,
            role: iterator.role,
            detail: iterator.detail,
            createdate: iterator.createdate,
            who: iterator.who,
          };
          await Parents.create(register_parent)
            .then((data) => {
              console.log("successsssss");
              User.create({
                login_code: result,
                username: iterator.username,
                role: 5,
                password: bcrypt.hashSync(iterator.password, 4),
                createdate: new Date(),
                who: iterator.who,
              }).then((user) => {});
            })
            .catch((err) => {
              console.error(err);
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while creating the parent.",
              });
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({
            message: err.message,
          });
        });
    }
  }
  res.status(200).send({ message: "success" });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const update_parent = {
    parent_code: req.body.parent_code,
    parent_idcard: req.body.parent_idcard,
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
    createdate: req.body.createdate,
    who: req.body.who,
  };
  Parents.update(update_parent, {
    where: { parent_code: id },
  })

    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Parent was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Parent with id = ${id}. Maybe Parent was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Parent with id=" + id,
      });
    });
};

exports.findAll = (req, res) => {
  Parents.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving parents.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  db.sequelize
    .query(
      `SELECT tmp.parent_code,tms.student_code,tmp.title,tmp.firstname,tmp.lastname , tmp.picture , tms.classroom_code  FROM t_master_parent tmp
      JOIN t_master_student tms  ON tmp.student_code = tms.student_code
                     WHERE   tmp.parent_code = '${id}'`,
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((_res) => {
      res.send(_res);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Parent " + err,
      });
    });
};

exports.findbyidcard = (req, res) => {
  const id = req.params.idcard;
  db.sequelize
    .query(
      `SELECT parent_code, parent_idcard, title, firstname, lastname, phonenumber, Address, email, picture, username, password, detail 
        FROM t_master_parent
        WHERE parent_idcard = '${id}' `,
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((_res) => {
      res.send(_res);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Parent " + err,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Parents.destroy({
    where: { parent_code: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Parent was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Parent with id=${id}. Maybe Parent was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Parent with id=" + id,
      });
    });
};
