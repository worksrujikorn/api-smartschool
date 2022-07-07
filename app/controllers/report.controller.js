const db = require("../models");
const Op = db.Sequelize.Op;
const { QueryTypes } = require("sequelize");
// const User = db.t_login;

// const mdl_user = db.mdl_user;
// const sendMail = require("../middleware/sendMail");
var bcrypt = require("bcryptjs");

exports.report1 = (req, res) => {
  console.log(req.body)
  let month_ = (req.body.month).substring(0, 4);
  let day_ = (req.body.month).substring(8, 5);

  let month_day = (parseInt(month_) - 543) + "-" + day_;
  // console.log(month_  + "-" + day_);
  // console.log("mooo",day_);


  db.sequelize
    .query(` SELECT  * ,SUBSTRING(cf.timein,1,10) as date , IFNULL ( CASE WHEN CAST(cf.timein AS time) > '08:00' THEN 1 ELSE 0 END, 0 ) AS late 
        FROM checkin_facescan cf
	    JOIN t_master_school_year tmsy on  tmsy.school_year_id  =  cf.school_year_id
	    JOIN t_master_student tms on  tms.student_code  =  cf.facescan_code
	    JOIN t_master_classroom tmc on tmc.classroom_code = tms.classroom_code
        WHERE
	    cf.facescan_code = "${req.body.student_code}" 
	        AND  tmc.classroom_code = "${req.body.classroom_code}"
		    AND tmc.classroom_level = '${req.body.classroom_level}' 
			AND tmsy.school_year_id = ${req.body.school_year_id} 
			AND SUBSTRING(cf.timein,1,7)  = '${month_day}'`, {
      type: QueryTypes.SELECT,
    })

    .then(async data => {
      if (data) {
        console.log(data)
        let maxdate = (new Date(new Date(month_day).getFullYear(), new Date(month_day).getMonth() + 1, 0)).getDate(month_day);
        console.log('max', maxdate);
        let year = new Date(month_day).getFullYear();
        let mouth = new Date(month_day).getMonth();
        let result = [];
        for (let index = 0; index < maxdate; index++) {
          let mouth_ = (mouth + 1).toString().length == 1 ? "0" + (mouth + 1) : mouth + 1
          let index_ = (index + 1).toString().length == 1 ? "0" + (index + 1) : index + 1
          let day = year + "-" + mouth_ + "-" + index_;
          // console.log(day)
          let datadate = data.find((d) => d.date == day)
          // console.log(datadate)

          if (datadate) {
            result.push({ ...datadate })
          } else {
            console.log("111111111")


            await db.sequelize
              .query(` SELECT tmc.category_name, leave_from,leave_to FROM t_leave as l
                            join t_master_category tmc on  tmc.category_code =  l.category_code
                            where leave_person = "${req.body.student_code}" and ('${day}'  BETWEEN CAST(l.leave_from as date )   AND  CAST(l.leave_to as date ))`, {
                type: QueryTypes.SELECT,
              })
              .then(data__ => {

                let cat = data__[0];
                console.log();

                if (cat) {

                  result.push({ date: day, description: cat.category_name })
                }
                else {
                  result.push({ date: day, description: "ขาดเรียน" })
                }
              }).catch(err__ => {
                res.status(500).send({
                  message: "Error retrieving student " + err__
                });
              });

          }
        }

        res.send(result);
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

exports.daily_time_personnel = (req, res) => {
  console.log(req.body)
  db.sequelize
    .query(` 		 SELECT
        * 
       FROM
        (
        SELECT
           tms.student_code,
           tms.title,
               tms.firstname,
           tms.lastname,
           cf.timein,
           cf.timeout ,
        tmc.classroom_level,
        tmc.classroom_code,
        cf.who,
           cf.description ,
           IFNULL ( CASE WHEN CAST(cf.timein AS time) > '08:00' THEN 1 ELSE 0 END, 0 ) AS late
        FROM
           t_master_student tms
        JOIN t_master_classroom tmc ON tmc.classroom_code = tms.classroom_code
           LEFT JOIN checkin_facescan cf ON cf.facescan_code = tms.student_code 
        WHERE
           CAST( cf.timein AS date ) = '${req.body.date}' 
        AND tmc.classroom_level = "${req.body.classroom_level}" AND tmc.classroom_code = "${req.body.classroom_code}"
       UNION ALL

        SELECT
           tms.student_code,
               tms.title,
           tms.firstname,
           tms.lastname,
           '' AS timein,
           '' AS timeout ,
        tmc.classroom_level,
        tmc.classroom_code,
        '' AS who ,
        'ขาดเรียน' AS description ,
        '' AS late
        FROM
           t_master_student tms 
           JOIN t_master_classroom tmc ON tmc.classroom_code = tms.classroom_code
        WHERE
           tms.student_code NOT IN ( SELECT tms.student_code FROM t_master_student tms 
        JOIN t_master_classroom tmc ON tmc.classroom_code = tms.classroom_code
           JOIN checkin_facescan cf ON cf.facescan_code = tms.student_code 
           WHERE CAST(cf.timein AS date) = '${req.body.date}'
           GROUP BY tms.student_code)  AND tmc.classroom_code = "${req.body.classroom_code}"  AND tmc.classroom_level = "${req.body.classroom_level}"
        ) m 
       ORDER BY
        m.student_code ASC  `
      , {
        type: QueryTypes.SELECT,
      })

    .then(async data => {
      // console.log(data);
      let result = [];
      for (let index = 0; index < data.length; index++) {

        if (data[index].timein == "") {
          await db.sequelize
            .query(` SELECT tmc.category_name, leave_from,leave_to FROM t_leave as l
                    join t_master_category tmc on  tmc.category_code =  l.category_code
                    where leave_person = "${data[index].student_code}" and ('${req.body.date}'  BETWEEN CAST(l.leave_from as date )   AND  CAST(l.leave_to as date ))`, {
              type: QueryTypes.SELECT,
            })
            .then(data__ => {
              let cat = data__[0];
              if (cat) {
                data[index].description = cat.category_name
              }

            })
            .catch(err__ => {
              res.status(500).send({
                message: "Error retrieving student " + err__
              });
            });

        }
      }
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving student " + err
      });
    });
};

exports.reportstafftime = (req, res) => {
  db.sequelize
    .query(
      `
        SELECT  * ,SUBSTRING(cf.timein,1,10) as date, 
        IFNULL ( CASE WHEN CAST(cf.timein AS time) > '08:00' THEN 1 ELSE 0 END, 0 ) AS late  
        FROM checkin_facescan_teacher cf
        JOIN t_master_teacher tmt ON cf.facescan_code = tmt.teacher_code
        WHERE cf.facescan_code = '${req.body.teacher_code}' AND
        SUBSTRING(cf.timein,1,7)  = '${req.body.month}'`,
      {
        type: QueryTypes.SELECT,
      }
    )
    .then(async (data) => {
      if (data) {
        let maxdate = new Date(
          new Date(req.body.month).getFullYear(),
          new Date(req.body.month).getMonth() + 1,
          0
        ).getDate(req.body.month);
        let year = new Date(req.body.month).getFullYear();
        let mouth = new Date(req.body.month).getMonth();
        let result = [];
        for (let index = 0; index < maxdate; index++) {
          let mouth_ =
            (mouth + 1).toString().length == 1 ? "0" + (mouth + 1) : mouth + 1;
          let index_ =
            (index + 1).toString().length == 1 ? "0" + (index + 1) : index + 1;
          let day = year + "-" + mouth_ + "-" + index_;
          // console.log(day)
          let datadate = data.find((d) => d.date == day);
          // console.log(datadate)

          if (datadate) {
            result.push({ ...datadate });
          } else {
            await db.sequelize
              .query(
                ` SELECT tmc.category_name, leave_from,leave_to FROM t_leave as l
                      join t_master_category tmc on  tmc.category_code =  l.category_code
                      where leave_person = '${req.body.teacher_code}' and ('${day}'  BETWEEN CAST(l.leave_from as date )   AND  CAST(l.leave_to as date ))`,
                {
                  type: QueryTypes.SELECT,
                }
              )
              .then((data__) => {
                let cat = data__[0];
                console.log();

                if (cat) {
                  result.push({ date: day, description: cat.category_name });
                } else {
                  result.push({ date: day, description: "ขาด" });
                }
              })
              .catch((err__) => {
                res.status(500).send({
                  message: "Error retrieving student " + err__,
                });
              });
          }
        }
        res.send(result);
      } else {
        res.status(404).send({
          message: `Cannot find student .`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.daily_time_staff = (req, res) => {
  // console.log(req.body.group_code)
  if (req.body.group_code == "") {
    db.sequelize
      .query(`SELECT * FROM(
        SELECT   
        tmt.teacher_code,
   
        tmt.title,tmt.firstname,tmt.lastname
          ,ct.timein
          ,ct.timeout 
          ,ct.who
          ,ct.description 
          ,IFNULL ( CASE WHEN CAST(ct.timein AS time) > '08:00' THEN 1 ELSE 0 END, 0 ) AS late 
          , tmt.group_code
          , tmg.group_name
        FROM t_master_teacher tmt 
        JOIN checkin_facescan_teacher ct ON tmt.teacher_code = ct.facescan_code
        LEFT JOIN t_master_group tmg ON tmt.group_code = tmg.group_code
        WHERE CAST(ct.timein as DATE) = '${req.body.date}'
        UNION ALL
        SELECT   tmt.teacher_code,

        tmt.title,tmt.firstname,tmt.lastname
          ,'' AS timein
          ,'' AS timeout 
         ,'' AS who 
         ,'ขาดสอน' AS description 
         ,'' AS late
         , tmt.group_code
         , tmg.group_name
        FROM t_master_teacher tmt 
        LEFT JOIN checkin_facescan_teacher ct ON tmt.teacher_code = ct.facescan_code
        LEFT JOIN t_master_group tmg ON tmt.group_code = tmg.group_code
        WHERE tmt.teacher_code NOT IN 
        (SELECT tmt.teacher_code FROM t_master_teacher tmt
        JOIN checkin_facescan_teacher ct ON tmt.teacher_code = ct.facescan_code
        WHERE CAST(ct.timein as DATE) = '${req.body.date}') 
        )m 
        GROUP BY m.teacher_code
        ORDER BY m.teacher_code ASC
          `
        , {
          type: QueryTypes.SELECT,
        })

      .then(async data => {
        // console.log(data);
        let result = [];
        for (let index = 0; index < data.length; index++) {

          if (data[index].timein == "") {
            await db.sequelize
              .query(` SELECT tmc.category_name, leave_from,leave_to FROM t_leave as l
                    join t_master_category tmc on  tmc.category_code =  l.category_code
                    where leave_person = "${data[index].teacher_code}" and ('${req.body.date}'  BETWEEN CAST(l.leave_from as date )   AND  CAST(l.leave_to as date ))`, {
                type: QueryTypes.SELECT,
              })
              .then(data__ => {
                let cat = data__[0];
                if (cat) {
                  data[index].description = cat.category_name
                }

              })
              .catch(err__ => {
                res.status(500).send({
                  message: "Error retrieving student " + err__
                });
              });

          }
        }
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving student " + err
        });
      });
  } else {
    db.sequelize
      .query(`SELECT * FROM(
          SELECT   
          tmt.teacher_code,
     
          tmt.title,tmt.firstname,tmt.lastname
            ,ct.timein
            ,ct.timeout 
            ,ct.who
            ,ct.description 
            ,IFNULL ( CASE WHEN CAST(ct.timein AS time) > '08:00' THEN 1 ELSE 0 END, 0 ) AS late 
            , tmt.group_code
            , tmg.group_name
          FROM t_master_teacher tmt 
          JOIN checkin_facescan_teacher ct ON tmt.teacher_code = ct.facescan_code
          LEFT JOIN t_master_group tmg ON tmt.group_code = tmg.group_code
          WHERE CAST(ct.timein as DATE) = '${req.body.date}' and  tmt.group_code = "${req.body.group_code}"
          UNION ALL 
          SELECT   tmt.teacher_code,
  
          tmt.title,tmt.firstname,tmt.lastname
            ,'' AS timein
            ,'' AS timeout 
           ,'' AS who 
           ,'ขาดสอน' AS description 
           ,'' AS late
           , tmt.group_code
           , tmg.group_name
          FROM t_master_teacher tmt 
          LEFT JOIN checkin_facescan_teacher ct ON tmt.teacher_code = ct.facescan_code
          LEFT JOIN t_master_group tmg ON tmt.group_code = tmg.group_code
          WHERE tmt.teacher_code NOT IN 
          (SELECT tmt.teacher_code FROM t_master_teacher tmt
          JOIN checkin_facescan_teacher ct ON tmt.teacher_code = ct.facescan_code
          WHERE CAST(ct.timein as DATE) = '${req.body.date}') and  tmt.group_code = "${req.body.group_code}"
          )m 
          GROUP BY m.teacher_code
          ORDER BY m.teacher_code ASC
          `
        , {
          type: QueryTypes.SELECT,
        })

      .then(async data => {
        // console.log(data);
        let result = [];
        for (let index = 0; index < data.length; index++) {

          if (data[index].timein == "") {
            await db.sequelize
              .query(` SELECT tmc.category_name, leave_from,leave_to FROM t_leave as l
                    join t_master_category tmc on  tmc.category_code =  l.category_code
                    where leave_person = "${data[index].teacher_code}" and ('${req.body.date}'  BETWEEN CAST(l.leave_from as date )   AND  CAST(l.leave_to as date ))`, {
                type: QueryTypes.SELECT,
              })
              .then(data__ => {
                let cat = data__[0];
                if (cat) {
                  data[index].description = cat.category_name
                }

              })
              .catch(err__ => {
                res.status(500).send({
                  message: "Error retrieving student " + err__
                });
              });

          }
        }
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving student " + err
        });
      });
  }

};
