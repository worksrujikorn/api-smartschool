const db = require("../models");
const Op = db.Sequelize.Op;
const { QueryTypes } = require("sequelize");
const code = require("./school_year.controller.js");
const School_year = db.t_master_school_year;
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

exports.get_school_year_all = (req, res) => {
  School_year.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving school_year."
      });
    });
};

exports.get_school_year_one = (req, res) => {
  const id = req.params.id;
  School_year.findAll({ where: { school_year_id: id } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find school_year with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving school_year with id=" + id
      });
    });
};

exports.create_school_year = (req, res) => {

  // Save User to Database

  const add_School_year = {

    school_term: req.body.school_term,
    school_year: req.body.school_year,
    school_year_start: req.body.school_year_start,
    school_year_end: req.body.school_year_end,
    createdate: new Date(),
    who: req.body.who
  };


  School_year.create(add_School_year)
    .then(data => {
      res.status(200).send({ message: 'success', data: data });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });




};

exports.update_school_year = (req, res) => {
  const id = req.params.id;
  // Save User to Database

  const update_school_year = {

    school_term: req.body.school_term,
    school_year: req.body.school_year,
    school_year_start: req.body.school_year_start,
    school_year_end: req.body.school_year_end,
    createdate: new Date(),
    who: req.body.who
  };

  School_year.update(update_school_year, {
    where: { school_year_id: id }
  })

    .then(num => {
      if (num == 1) {
        res.send({
          message: "school_year was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update school_year with id = ${id}. Maybe school_year was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Error updating school_year with id=" + id
      });
    });






};

exports.delete_school_year = (req, res) => {
  const id = req.params.id;
  School_year.destroy({
    where: { school_year_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "school_year was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete school_year with id=${id}. Maybe school_year was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete school_year with id=" + id
      });
    });
};


exports.get_school_color = (req, res) => {
  let id = 1;
  db.sequelize
    .query(
      `SELECT * FROM t_master_school_color
    WHERE  school_id =   ${id}`,
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

exports.get_school_color_suanphueng = (req, res) => {
  let id = 2;
  db.sequelize
    .query(
      `SELECT * FROM t_master_school_color
    WHERE  school_id =   ${id}`,
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

exports.post_update_school_color = (req, res) => {
  let id = 1;
  db.sequelize
    .query(
      ` UPDATE  t_master_school_color 
      SET
      sidebarcolor ="${req.body.sidebarcolor}" 
      , sidebarfrontcolor = "${req.body.sidebarfrontcolor}" 
      , iconcolor = "${req.body.iconcolor}" 
      ,hoversidebarfrontcolor ="${req.body.hoversidebarfrontcolor}" 
      , logouticoncolor = "${req.body.logouticoncolor}" 
      , notifyiconcolor = "${req.body.notifyiconcolor}" 
      , notifyfrontcolor ="${req.body.notifyfrontcolor}" 
      , dashbordfront = "${req.body.dashbordfront}" 
      , hovercolor ="${req.body.hovercolor}" 
      , dashbordcolor = "${req.body.dashbordcolor}" 
      , schooliconcolor ="${req.body.schooliconcolor}" 
      , schoolfrontcolor = "${req.body.schoolfrontcolor}" 
      , schoolname = "${req.body.schoolname}" 
      , schoolnameEN ="${req.body.schoolnameEN}"
    WHERE  school_id =   ${id}`,
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
exports.post_update_school_color_suanphueng = (req, res) => {
  let id = 2;
  db.sequelize
    .query(
      ` UPDATE  t_master_school_color 
      SET
      sidebarcolor ="${req.body.sidebarcolor}" 
      , sidebarfrontcolor = "${req.body.sidebarfrontcolor}" 
      , iconcolor = "${req.body.iconcolor}" 
      ,hoversidebarfrontcolor ="${req.body.hoversidebarfrontcolor}" 
      , logouticoncolor = "${req.body.logouticoncolor}" 
      , notifyiconcolor = "${req.body.notifyiconcolor}" 
      , notifyfrontcolor ="${req.body.notifyfrontcolor}" 
      , dashbordfront = "${req.body.dashbordfront}" 
      , hovercolor ="${req.body.hovercolor}" 
      , dashbordcolor = "${req.body.dashbordcolor}" 
      , schooliconcolor ="${req.body.schooliconcolor}" 
      , schoolfrontcolor = "${req.body.schoolfrontcolor}" 
      , schoolname = "${req.body.schoolname}" 
      , schoolnameEN ="${req.body.schoolnameEN}"
    WHERE  school_id =   ${id}`,
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


exports.get_year = (req, res) => {
 
  db.sequelize
    .query(
      `SELECT school_year FROM t_master_school_year
     group by school_year`,
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

exports.get_term = (req, res) => {
 
  db.sequelize
    .query(
      `SELECT school_term FROM t_master_school_year
     group by school_term`,
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

