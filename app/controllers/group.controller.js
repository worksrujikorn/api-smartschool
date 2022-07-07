const db = require("../models");
const Op = db.Sequelize.Op;
const { QueryTypes } = require("sequelize");
const code = require("./group.controller.js");
const group = db.t_master_group;
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

exports.get_group_all = (req, res) => {
  group.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving group."
      });
    });
};

exports.get_group_one = (req, res) => {
  const id = req.params.id;
  group.findAll({ where: { group_id: id } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find group with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving group with id=" + id
      });
    });
};

exports.create_group = (req, res) => {

  // Save User to Database

  const add_group = {

    group_code: req.body.group_code,
    group_name: req.body.group_name,
    detail: req.body.detail,
    createdate: new Date(),
    who: req.body.who
  };


  group.create(add_group)
    .then(data => {
      res.status(200).send({ message: 'success', data: data });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });




};

exports.update_group = (req, res) => {
  const id = req.params.id;
  // Save User to Database

  const update_group = {
    
    group_name: req.body.group_name,
    detail: req.body.detail,
    createdate: new Date(),
    who: req.body.who
  };

  group.update(update_group, {
    where: { group_id: id }
  })

    .then(num => {
      if (num == 1) {
        res.send({
          message: "group was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update group with id = ${id}. Maybe group was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Error updating group with id=" + id
      });
    });






};

exports.delete_group = (req, res) => {
  const id = req.params.id;
  group.destroy({
    where: { group_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "group was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete group with id=${id}. Maybe group was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete group with id=" + id
      });
    });
};