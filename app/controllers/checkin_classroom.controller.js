const db = require("../models");
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');


const CheckinClassroom = db.checkin_classroom;
const Classroom = db.t_master_classroom;
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

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.checkin_classroom_code && !req.body.schedule_code) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    for await (const iterator of req.body.student_code_uncheck) {
        db.sequelize
            .query(`DELETE FROM checkin_classroom WHERE  schedule_code='${req.body.schedule_code}'   and CAST(datetime as date)= CAST('${req.body.datetime}' as DATE)`, {
                type: QueryTypes.SELECT,
            })
            .then((_res) => {
                console.log(_res);
            })
            .catch((err) => {
                console.log(err);
            });

    }




    console.log('start');


    // ----

    for await (const student_code of req.body.student_code) {
        // Create a checkin_classroom
        const form = {
            checkin_classroom_id: req.body.checkin_classroom_id,
            checkin_classroom_code: req.body.checkin_classroom_code,
            student_code: student_code,
            datetime: req.body.datetime,
            teacher_code: req.body.teacher_code,
            schedule_code: req.body.schedule_code,
            detail: req.body.detail,
        };

        // Save checkin_classroom in the database

        CheckinClassroom.create(form)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the checkin_classroom."
                });
            });
    }

    res.send({ message: 'success' });

};
exports.findAll = (req, res) => {
    //const title = req.query.title;
    //var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
    CheckinClassroom.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving CheckinClassrooms."
            });
        });
};
exports.findOne = (req, res) => {
    const id = req.params.id;
    CheckinClassroom.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find CheckinClassroom with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving CheckinClassroom with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;
    CheckinClassroom.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "CheckinClassroom was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update CheckinClassroom with id=${id}. Maybe CheckinClassroom was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating CheckinClassroom with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;
    CheckinClassroom.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "CheckinClassroom was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete CheckinClassroom with id=${id}. Maybe CheckinClassroom was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete CheckinClassroom with id=" + id
            });
        });
};



exports.checkname_code_classroom = (req, res) => {

    db.sequelize
        .query(` SELECT COUNT(*) as cnt  from t_master_classroom 
WHERE classroom_code = "${req.body.codename}" || classroom_name = "${req.body.codename}" `, {
            type: QueryTypes.SELECT,
        })
        .then((num) => {
            console.log(num[0].cnt)

            if (num[0].cnt == 0) {

                res.send("1");
            } else {
                res.send("0");
            }

        })
        .catch((err) => {
            console.log(err);
        });




};

exports.get_classroom_all = (req, res) => {
    Classroom.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving classroom."
            });
        });
};

exports.get_classroom_one = (req, res) => {
    const id = req.params.id;
    Classroom.findAll({ where: { classroom_code: id } })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find classroom with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving classroom with id=" + id
            });
        });
};

exports.create_classroom = (req, res) => {

    // Save User to Database
    if (!req.body.classroom_code && !req.body.classroom_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const add_classroom = {
        classroom_code: req.body.classroom_code,
        classroom_name: req.body.classroom_name,
        classroom_level: req.body.classroom_level,
        detail: req.body.detail,
        createdate: new Date(),
        who: req.body.who
    };


    Classroom.create(add_classroom)
        .then(data => {
            res.status(200).send({ message: 'success', data: data });

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });




};

exports.update_classroom = (req, res) => {
    const id = req.params.id;
    // Save User to Database
    if (!req.body.classroom_code && !req.body.classroom_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const update_classroom = {
        classroom_name: req.body.classroom_name,
        classroom_level: req.body.classroom_level,
        detail: req.body.detail,
        createdate: new Date(),
        who: req.body.who
    };

    Classroom.update(update_classroom, {
        where: { classroom_code: id }
    })

        .then(num => {
            if (num == 1) {
                res.send({
                    message: "classroom was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update classroom with id = ${id}. Maybe News was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message: "Error updating News with id=" + id
            });
        });






};

exports.delete_classroom = (req, res) => {
    const id = req.params.id;
    Classroom.destroy({
        where: { classroom_code: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Classroom was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Classroom with id=${id}. Maybe Classroom was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Classroom with id=" + id
            });
        });
};

exports.get_classroom_level = (req, res) => {

    db.sequelize
        .query(`  SELECT classroom_level FROM t_master_classroom GROUP BY classroom_level `, {
            type: QueryTypes.SELECT,
        })
        .then(data__ => {
            res.send(data__);
        })
        .catch(err__ => {
            res.status(500).send({
                message: "Error retrieving classroom " + err__
            });
        });
};


exports.post_student_checkin = (req, res) => {
    date_ob = new Date();
    const date_now = con_date_now(date_ob);
    // SELECT * , IFNULL ( CASE WHEN CAST(timein AS time) BETWEEN '08:01' AND '16:00' THEN "สาย" ELSE "" END, 0 ) AS late  FROM checkin_facescan WHERE facescan_code = "${req.body.student_code}" AND  CAST(timein as date) = '${date_now}'
    db.sequelize
        .query(` 
         SELECT * , IFNULL ( CASE WHEN CAST(timein AS time) BETWEEN '08:01' AND '16:00' THEN "สาย" ELSE "" END, 0 ) AS late  FROM checkin_facescan WHERE facescan_code = "${req.body.student_code}" 
         `
        , {
            type: QueryTypes.SELECT,
        })
        .then(data__ => {


            res.send(data__);



        })
        .catch(err__ => {
            res.status(500).send({
                message: "Error retrieving classroom " + err__
            });
        });
};


