const db = require("../models");
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');


const Teachers = db.t_master_teacher;

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

    return date_now


}
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

    const datetime_now = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    return datetime_now

}


// current date
// adjust 0 before single digit date

// prints date in YYYY-MM-DD format
// console.log(year + "-" + month + "-" + date);

// prints date & time in YYYY-MM-DD HH:MM:SS format
// console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

// prints time in HH:MM format
// console.log(hours + ":" + minutes);

exports.checkin_line_all = (req, res) => {


    // const id = req.params.id;

    date_ob = new Date();
    const date_now = con_date_now(date_ob);

    // db.sequelize
    //     .query(`SELECT tms.student_code,tms.title,tms.firstname,tms.lastname,tms.firstname_en,tms.lastname_en,tms.picture,tmc.classroom_name ,MIN(ckf.timein), ckf.scan_status
    //     FROM t_master_classroom as tmc
    //     JOIN t_master_teacher as tmt ON tmc.classroom_code = tmt.classroom_code
    //     JOIN t_master_student as tms ON  tms.classroom_code = tmc.classroom_code
    //     JOIN checkin_facescan as ckf on ckf.facescan_code = tms.student_code
    //     WHERE tmt.teacher_code = '${id}' AND CAST(ckf.timein as date) = '${date_now}'
    //     GROUP BY ckf.facescan_code`, {
    //         type: QueryTypes.SELECT,
    //     })

    db.sequelize
        .query(`  SELECT * FROM(
            SELECT  tms.student_code,tms.title,tms.firstname,tms.lastname,tms.firstname_en,tms.lastname_en,tms.picture,tmc.classroom_name ,MIN(ckf.timein) as timein, ckf.scan_status
            FROM t_master_classroom as tmc
            JOIN t_master_teacher as tmt ON tmc.classroom_code = tmt.classroom_code
            JOIN t_master_student as tms ON  tms.classroom_code = tmc.classroom_code
            JOIN checkin_facescan as ckf on ckf.facescan_code = tms.student_code
            WHERE tmt.teacher_code = "${req.body.teacher_code}" AND CAST(ckf.timein as date) = '${date_now}' AND tmt.classroom_code = "${req.body.classroom_code}"
             GROUP BY ckf.facescan_code
            UNION ALL
            SELECT tms.student_code,tms.title,tms.firstname,tms.lastname,tms.firstname_en,tms.lastname_en ,tms.picture,classroom_name ,'' as timein, '' as scan_status
            FROM  t_master_classroom tmc
            JOIN t_master_teacher tmt on  tmt.classroom_code = tmc.classroom_code
            JOIN t_master_student tms on tms.classroom_code = tmc.classroom_code
            WHERE tms.student_code NOT IN (
              SELECT  tms.student_code  FROM t_master_classroom as tmc
              JOIN t_master_teacher as tmt ON tmc.classroom_code = tmt.classroom_code
              JOIN t_master_student as tms ON  tms.classroom_code = tmc.classroom_code
              JOIN checkin_facescan as ckf on ckf.facescan_code = tms.student_code
              WHERE tmt.teacher_code = "${req.body.teacher_code}" AND CAST(ckf.timein as date) = '${date_now}' ) AND tmt.classroom_code =  "${req.body.classroom_code}" GROUP BY tms.student_code
            )M`, {
            type: QueryTypes.SELECT,
        })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find student with id=${req.body.teacher_code}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving student with id=" + req.body.teacher_code
            });
        });
};



exports.update_checkin_line = async (req, res) => {

    date_ob = new Date();
    const date_now = con_date_now(date_ob);

    const datetime_now = con_datetime_now(date_ob);

    // console.log(req.body)
    for await (const iterator of req.body) {
        // console.log(iterator)
        await db.sequelize
            .query(` SELECT COUNT(*) as cnt FROM checkin_facescan
        WHERE facescan_code = '${iterator.studentcode}' and CAST(timein as date) = '${date_now}'`, {
                type: QueryTypes.SELECT,
            })
            .then(async data => {
                console.log(data)
                if (data[0].cnt == 1) {
                    console.log(data[0].cnt)
                    await db.sequelize
                        .query(`UPDATE checkin_facescan SET scan_status = '${iterator.studentstatus}', time_line = '${datetime_now}'
                    WHERE facescan_code = '${iterator.studentcode}' and CAST(timein as date) = '${date_now}'`, {
                            type: QueryTypes.UPDATE,
                        }).then(data_ => {
                            console.log("Updated")
                        })
                        .catch(err => {
                            console.log(err)
                        });

                } else {
                    await db.sequelize
                        .query(` INSERT INTO checkin_facescan (facescan_code, timein, scan_status, time_line)
                    VALUES ('${iterator.studentcode}','${datetime_now}','${iterator.studentstatus}','${datetime_now}')`, {
                            type: QueryTypes.INSERT,
                        }).then(data_ => {
                            console.log("Inserted")
                        })
                        .catch(err => {
                            console.log(err)
                        });
                }

            })


    }
    res.status(200).send({
        message: "Checkin Sucess"
    });

};

exports.checkinlist = (req, res) => {
    date_ob = new Date();
    const classroom = req.params.class;
    const date_now = con_date_now(date_ob);
    db.sequelize
        .query(`SELECT * FROM (		
            SELECT cf.checkin_facescan_id ,tt.firstname as teacher, tc.classroom_code, ts.student_code, ts.firstname, ts.lastname, ts.picture, cf.timein, cf.timeout, CAST(cf.timein as date) as chkdate, cf.scan_status
            FROM t_master_student ts 
            JOIN checkin_facescan cf ON ts.student_code = cf.facescan_code
            JOIN t_master_classroom tc ON ts.classroom_code = tc.classroom_code 
            JOIN t_master_teacher tt ON tc.classroom_code = tt.classroom_code
            WHERE CAST(cf.timein as date) = '${date_now}' AND ts.classroom_code = '${classroom}'
            GROUP BY ts.student_code
            UNION
            SELECT '' as checkin_facescan_id,tt.firstname as teacher, tc.classroom_code, 
            ts.student_code, ts.firstname, ts.lastname, '' as picture, '' as timein, '' as timeout, '' as chkdate, '' as check_type
            FROM t_master_student ts 
            JOIN t_master_classroom tc ON ts.classroom_code = tc.classroom_code
            JOIN t_master_teacher tt ON tc.classroom_code = tt.classroom_code
            WHERE ts.student_code NOT IN
            (SELECT ts.student_code
            FROM t_master_student ts 
            LEFT JOIN checkin_facescan cf ON ts.student_code = cf.facescan_code
            WHERE CAST(cf.timein as date) = '${date_now}'
            ) AND ts.classroom_code = '${classroom}' 
            GROUP BY ts.student_code
            )M
            ORDER BY M.student_code `, {
            type: QueryTypes.SELECT,
        })
        .then((data) => {

            res.send(data);
        })
        .catch((err) => {
            console.log(err);
        });
};


exports.checkinlist_teacher = (req, res) => {
    date_ob = new Date();
    // const classroom = req.params.class;
    const date_now = con_date_now(date_ob);
    db.sequelize
        .query(`       SELECT * FROM (		
                            SELECT cf.checkin_facescan_id ,ts.firstname as teacher, ts.classroom_code, ts.teacher_code, ts.firstname, ts.lastname, ts.picture, cf.timein, cf.timeout, CAST(cf.timein as date) as chkdate, cf.scan_status
                            FROM t_master_teacher ts 
                            JOIN checkin_facescan_teacher cf ON ts.teacher_code = cf.facescan_code
                          
                        
                            WHERE CAST(cf.timein as date) = '${date_now}' 
                            GROUP BY ts.teacher_code
                            UNION
                            SELECT '' as checkin_facescan_id,ts.firstname as teacher, ts.classroom_code, 
                            ts.teacher_code, ts.firstname, ts.lastname, '' as picture, '' as timein, '' as timeout, '' as chkdate, '' as check_type
                            FROM t_master_teacher ts 
                   
                         
                            WHERE ts.teacher_code NOT IN
                            (SELECT ts.teacher_code
                            FROM t_master_teacher ts 
                            LEFT JOIN checkin_facescan_teacher cf ON ts.teacher_code = cf.facescan_code
                            WHERE CAST(cf.timein as date) = '${date_now}'
                            ) 
                            GROUP BY ts.teacher_code
                            )M
                            ORDER BY M.teacher_code 
                             `, {
            type: QueryTypes.SELECT,
        })
        .then((data) => {

            res.send(data);
        })
        .catch((err) => {
            console.log(err);
        });
};


exports.update_checkin_line_teacher = async (req, res) => {

    date_ob = new Date();
    const date_now = con_date_now(date_ob);

    const datetime_now = con_datetime_now(date_ob);

    // console.log(req.body)
    for await (const iterator of req.body) {
        // console.log(iterator)
        await db.sequelize
            .query(` SELECT COUNT(*) as cnt FROM checkin_facescan_teacher
        WHERE facescan_code = '${iterator.teacher_code}' and CAST(timein as date) = '${date_now}'`, {
                type: QueryTypes.SELECT,
            })
            .then(async data => {
                console.log(data)
                if (data[0].cnt == 1) {
                    console.log(data[0].cnt)
                    await db.sequelize
                        .query(`UPDATE checkin_facescan_teacher SET scan_status = '${iterator.teacherstatus}', time_line = '${datetime_now}'
                    WHERE facescan_code = '${iterator.teacher_code}' and CAST(timein as date) = '${date_now}'`, {
                            type: QueryTypes.UPDATE,
                        }).then(data_ => {
                            console.log("Updated")
                        })
                        .catch(err => {
                            console.log(err)
                        });

                } else {
                    await db.sequelize
                        .query(` INSERT INTO checkin_facescan_teacher (facescan_code, timein, scan_status, time_line)
                    VALUES ('${iterator.teacher_code}','${datetime_now}','${iterator.teacherstatus}','${datetime_now}')`, {
                            type: QueryTypes.INSERT,
                        }).then(data_ => {
                            console.log("Inserted")
                        })
                        .catch(err => {
                            console.log(err)
                        });
                }

            })


    }
    res.status(200).send({
        message: "Checkin Sucess"
    });

};