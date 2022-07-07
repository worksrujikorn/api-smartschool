const db = require("../models");
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');
const Behaviour = db.t_master_behaviour;
const code = require("./gencode.controller.js");
const score = db.behaviour_score
const Students = db.t_master_student;


exports.studentscorebyid = (req, res) => {
    const id = req.params.student_code;
    db.sequelize
        .query(`SELECT student_code, score FROM t_master_student WHERE student_code = '${id}'`, {
            type: QueryTypes.SELECT,
        })
        .then(data => {
            res.status(200).send({ "data": data, "status": true })
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Student with id=" + id
            });
        });
};



exports.behaviour_send = async (req, res) => {
    if (!req.body.student_code) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }


    db.sequelize
        .query(`SELECT MAX(score_code)  as maxid FROM behaviour_score`, {
            type: QueryTypes.SELECT,
        })
        .then((_res) => {

            let id = _res[0].maxid.substring(2);
            let txt = _res[0].maxid.substring(0, 2);
            let num = parseInt(id);
            let len = String(id).length;
            let result = code.gencode(num, txt, len);
            // Create a parent

            const behaviour = {
                score_code: result,
                behaviour: req.body.behaviour,
                score_type: req.body.score_type,
                score_amount: req.body.score_amount,
                student_code: req.body.student_code,
                datetime: new Date(),
                teacher_code: req.body.teacher_code,
                detail: req.body.detail
            };

            // Save Parent in the database
            score.create(behaviour)
                .then(data => {
                    if (data.score_type == 'Y') {
                        db.sequelize
                            .query(`UPDATE t_master_student SET score = score+${data.score_amount} WHERE student_code = '${data.student_code}'`, {
                                type: QueryTypes.UPDATE,
                            })
                            .then(result => {

                            })
                    } else {
                        db.sequelize
                            .query(`UPDATE t_master_student SET score = score-${data.score_amount} WHERE student_code = '${data.student_code}'`, {
                                type: QueryTypes.UPDATE,
                            })
                            .then(result => {

                            })
                    }

                    res.status(200).send({ message: 'success', data: data });

                })
                .catch(err => {
                    console.error(err);
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the parent."
                    });
                });
        })
        .catch((err) => {
            console.log(err);
        });
    // Save Parent in the database

};


exports.findOne = (req, res) => {
    const id = req.params.id;
    score.findAll({ where: { student_code: id } })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Behaviour_student with id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Behaviour_student with id=" + id
            });
        });
};

exports.behaviour_list = (req, res) => {
    db.sequelize
        .query(`SELECT bs.score_code, tb.behaviour_name, tb.score, CONCAT(ts.title,ts.firstname,'  ',ts.lastname) as 'Name', 
        bs.detail,
        CASE 
            WHEN bs.score_type = 'P' THEN 'บวก'
            ELSE 'ลบ'
        END AS type,
        DATE_FORMAT(bs.datetime,'%d/%m/%Y %H:%m:%i') as date
        FROM behaviour_score bs
        JOIN t_master_student ts ON bs.student_code = ts.student_code
        JOIN t_master_teacher tt ON bs.teacher_code = tt.teacher_code
        JOIN t_master_behaviour tb ON bs.behaviour = tb.behaviour_id
        WHERE bs.student_code = '${req.body.student_code}'`, {
            type: QueryTypes.SELECT,
        })
        .then(result => {
            res.status(200).send({ "data": result, "status": true })
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred while retrieving Master_Behaviour."
            });
        });
}

exports.findAll = (req, res) => {
    Behaviour.findAll()
        .then(data => {
            res.status(200).send({ "data": data, "status": true })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Master_Behaviour."
            });
        });
};

exports.OneBahav = (req, res) => {

    db.sequelize
        .query(
            `SELECT * FROM t_master_behaviour
            WHERE  behaviour_id =   "${req.body.behaviour_id}"`,
            {
                type: QueryTypes.SELECT,
            }
        )
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find behaviour_id with id = ${req.body.behaviour_id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving behaviour_id with id=" + req.body.behaviour_id
            });
        });
};



exports.create_behaviour = async (req, res) => {
    db.sequelize
        .query(`SELECT MAX(behaviour_id)  as maxid FROM t_master_behaviour`, {
            type: QueryTypes.SELECT,
        })
        .then((_res) => {

            let id = _res[0].maxid.substring(2);
            let txt = _res[0].maxid.substring(0, 2);
            let num = parseInt(id);
            let len = String(id).length;
            let result = code.gencode(num, txt, len);
            // Create a behaviour

            const behaviour = {
                behaviour_id: result,
                behaviour_name: req.body.behaviour_name,
                score: req.body.score,
            };

            // console.log(behaviour);
            // Save behaviour in the database
            Behaviour.create(behaviour)
                .then(data => {
                    res.status(200).send({ message: 'success', data: data });
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error " + err
                    });
                });

        })
        .catch((err) => {
            console.log(err);
        });


};

exports.update_behaviour = (req, res) => {
    const id = req.params.id;
    // Save User to Database

    const data_update_behaviour = {
        behaviour_name: req.body.behaviour_name,
        score: req.body.score,
    };

    Behaviour.update(data_update_behaviour, {
        where: { behaviour_id: id }
    })

        .then(num => {
            if (num == 1) {
                res.send({
                    message: "behaviour was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update behaviour with id = ${id}. Maybe behaviour was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message: "Error updating behaviour with id=" + id
            });
        });

};

exports.delete_behaviour = (req, res) => {


    const id = req.params.id;


    db.sequelize
        .query(
            `SELECT count(*) as count FROM behaviour_score
        WHERE  behaviour =   "${id}"`,
            {
                type: QueryTypes.SELECT,
            }
        )
        .then(data => {
            if (data[0].count == 0) {
                Behaviour.destroy({
                    where: { behaviour_id: id }
                })
                    .then(num => {

                        if (num == 1) {
                            res.send({
                                message: "behaviour was deleted successfully!"
                            });
                        } else {
                            res.send({
                                message: `Cannot delete behaviour with id=${id}. Maybe behaviour was not found!`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Could not delete behaviour with id=" + id
                        });
                    });
            } else {
                res.send({
                    message: "ไม่สามารถลบได้ เนื่องจากข้อมูลมีการใช้งานแล้ว"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving behaviour_id with id=" + id
            });
        });





};