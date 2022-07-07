const db = require("../models");
const Register = db.registers;
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');
const sendMail = require("../middleware/sendMail");

exports.create = (req, res) => {
    // Validate request
    if (!req.body.name && !req.body.age) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Tutorial
    const register = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        dob: req.body.dob,
        who: req.body.who,
    };
    // Save Tutorial in the database
    Register.create(register)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the register."
            });
        });
};
exports.findAll = (req, res) => {
    //const title = req.query.title;
    //var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
    Register.findAll()//{ where: condition }
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving register."
            });
        });
};
exports.findbyname = (req, res) => {
    console.log(req.params);
    const Name = req.params.name;
    //var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
    Register.findAll({ where: { name: Name } })//{ where: condition }
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving register."
            });
        });
};
exports.findbyname_ = async (req, res) => {
    console.log(req.params);
    const Name = req.params.name;
    db.sequelize.query(`select * from tr_registers WHERE name='${Name}'`,
        { type: QueryTypes.SELECT }).then((_res) => {
            res.send(_res);

        }).catch((err) => {
            console.log(err);
        });
    //   await  db.sequelize.query(`select * from tr_registers WHERE name='${Name}'`, (err, _res) => {
    //         if (err) {
    //             console.log(err);
    //             res.status(500).send({
    //                 message:
    //                     err.message || "Some error occurred while retrieving findProfile."
    //             });
    //         }
    //         res.send(_res);
    // });


};
exports.findOne = (req, res) => {
    const id = req.params.id;
    Register.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find register with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving register with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;
    Register.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "register was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update register with id=${id}. Maybe register was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating register with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;
    Register.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "register was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete register with id=${id}. Maybe register was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete register with id=" + id
            });
        });
};

exports.Saveimage = (req, res) => {
    const register = new Register({
        name: req.body.type + "/" + req.body.name + '-' + req.file.originalname,// + '-' + req.file.originalname
    })
    res.send({ success: true, data: register.name });
  };

  exports.sendToEMail = (req, res) => {
    if (!req.body.name && !req.body.email) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    sendMail.veriFymail(req.body);
    res.status(200).send({message:"Send Email successfully"})
};
