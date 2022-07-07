const db = require("../models");
const config = require("../config/auth.config");
const { QueryTypes } = require("sequelize");

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

exports.schdule_student = async (req, res) => {
  db.sequelize
    .query(
      `SELECT  tms.student_code,ts.schedule_id , ts.room_code,tmr.room_name , tmj.subject_code , tmj.subject_name,
tmt.title as teacher_title  ,tmt.firstname as teacher_firstname , tmt.lastname as teacher_lastname
,tmc.classroom_name, ts.date, ts.hours, ts.period, ts.detail
FROM t_schedule ts
   left JOIN t_master_teacher tmt ON ts.teacher_code  = tmt.teacher_code
   left JOIN t_master_classroom tmc ON ts.classroom_code  = tmc.classroom_code
   left JOIN t_master_student tms ON ts.classroom_code  = tms.classroom_code
   left JOIN t_master_subject tmj ON ts.subject_code  = tmj.subject_code
     left join t_master_room tmr  on tmr.room_code  = ts.room_code
    WHERE tms.student_code = '${req.body.student_code}' order by ts.hours`,
      { type: QueryTypes.SELECT }
    )
    .then(async (_res) => {
      // let period_num = [];

      // for await (const iterator of _res) {
      //   if (period_num.filter((p) => p == iterator.period).length == 0) {
      //     period_num.push(iterator.period);
      //   }
      // }

      // let period_count = [];
      // for (let index = 0; index < period_num.length; index++) {
      //   period_count.push(index + 1);
      // }
      let period_num = [];
      let period_count = [];

      for await (const iterator of _res) {
        if (period_num.filter((p) => p == iterator.period).length == 0) {
          period_num.push(iterator.period);
        }

        if (period_count.filter((p) => p == iterator.hours).length == 0) {
          period_count.push(iterator.hours);
        }

      }



      const day = ["", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"];
      const dayNum = [1, 2, 3, 4, 5];
      let data = [];
      let num = 1;
      for await (const iterator of _res) {
        let form = {
          day: iterator.date,
          hours: iterator.hours,
          room_code: iterator.room_code,
          subject_code: iterator.subject_code,
          subject_name: iterator.subject_name,
          teacher_title: iterator.teacher_title,
          teacher_firstname: iterator.teacher_firstname,
          teacher_lastname: iterator.teacher_lastname,
          period: iterator.period,
          room_name: iterator.room_name == "ไม่ระบุ" ? "-" : iterator.room_name,
        };
        data.push(form);
        num++;
      }
      let result = [];
      for (const iterator of dayNum) {
        let data_period = [];
        for (let index = 0; index < period_num.length; index++) {
          const period = period_num[index];
          let dataByDay = data.find(
            (d) => d.period == period && d.day == iterator
          );
          data_period.push({ ...dataByDay, periods: period, hours: index + 1 });
        }

        let form = {
          day: day[iterator],
          type: iterator,
          periods: period_num,
          periodsCount: period_count,
          period: data_period ? data_period : [],
        };
        result.push(form);
      }

      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.schedule_student_period = async (req, res) => {
  db.sequelize
    .query(
      `
    SELECT  tms.student_code,ts.schedule_id ,
     ts.room_code,tmr.room_name  , tmj.subject_code , tmj.subject_name,
tmt.title as teacher_title  ,tmt.firstname as teacher_firstname , tmt.lastname as teacher_lastname
,tmc.classroom_name, ts.date, ts.hours, ts.period, ts.detail,cc.datetime as status_checkinclassroom
FROM t_schedule ts
  left  JOIN t_master_teacher tmt ON ts.teacher_code  = tmt.teacher_code
  left   JOIN t_master_classroom tmc ON ts.classroom_code  = tmc.classroom_code
  left   JOIN t_master_student tms ON ts.classroom_code  = tms.classroom_code
  left   JOIN t_master_subject tmj ON ts.subject_code  = tmj.subject_code
    left  join t_master_room tmr  on tmr.room_code  = ts.room_code
    left join checkin_classroom cc on cc.schedule_code  =ts.schedule_code     
    and tms.student_code = cc.student_code and  CAST(cc.\`datetime\` as date) =CAST('${req.body.datetime}' as date) 
    WHERE tms.student_code = '${req.body.student_code}' and ts.\`date\` ='${req.body.date}'
     order by ts.hours`,
      { type: QueryTypes.SELECT }
    )
    .then((_res) => {
      res.send(_res);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.schdule_teacher = async (req, res) => {
  db.sequelize
    .query(
      `SELECT  ts.schedule_id , ts.room_code,tmr.room_name , tmj.subject_code , tmj.subject_name,
tmt.title as teacher_title  ,tmt.firstname as teacher_firstname , tmt.lastname as teacher_lastname
,tmc.classroom_name, ts.date, ts.hours, ts.period, ts.detail
FROM t_schedule ts
   left JOIN t_master_teacher tmt ON ts.teacher_code  = tmt.teacher_code
   left JOIN t_master_classroom tmc ON ts.classroom_code  = tmc.classroom_code
   left JOIN t_master_subject tmj ON ts.subject_code  = tmj.subject_code
     left join t_master_room tmr  on tmr.room_code  = ts.room_code
    WHERE tmt.teacher_code = '${req.body.teacher_code}' order by ts.hours`,
      { type: QueryTypes.SELECT }
    )
    .then(async (_res) => {
      let period_num = [];
      let period_count = [];
      let num__ = 1;


      for (let index = 0; index < 10; index++) {
        if (index == 0) {
          period_num.push("8.00-8.30");
          period_count.push(index);
        }
        else if (index == 1) {
          period_num.push("8.30-9.20");
          period_count.push(index);
        }
        else if (index == 2) {
          period_num.push("9.20-10.10");
          period_count.push(index);
        }
        else if (index == 3) {
          period_num.push("10.10-11.00");
      
          period_count.push(index);
        }
        else if (index == 4) {
          period_num.push("11.00-11.50");
      
          period_count.push(index);
        }
        else if (index == 5) {
          period_num.push("11.50-12.40");
         
          period_count.push(index);
        }
        else if (index == 6) {
          period_num.push("12.40-13.30");
     
          period_count.push(index);
        }
        else if (index == 7) {
          period_num.push("13.30-14.20");

          period_count.push(index);
        }
        else if (index == 8) {
          period_num.push("14.20-15.10");
          
          period_count.push(index);
        }
        else if (index == 9) {
          period_num.push("15.10-16.00");
          
          period_count.push(index);
        }
        
      }
      // for await (const iterator of _res) {
      //   if (period_num.filter((p) => p == iterator.period).length == 0) {
      //     // console.log(period_num)
      //     if (num__ == 0) {
      //       period_num = ["8.00-8.30"];
      //       period_count.push(num__);
      //     }
      //     else if (num__ == 1) {
      //       period_num = ["8.30-9.20"];
      //       period_count.push(num__);
      //     }
      //     else if (num__ == 2) {
      //       period_num = ["9.20-10.10"];
      //       period_count.push(num__);
      //     }
      //     else if (num__ == 3) {
      //       period_num = ["10.10-11.00"];
        
      //       period_count.push(num__);
      //     }
      //     else if (num__ == 4) {
      //       period_num = ["11.00-11.50"];
        
      //       period_count.push(num__);
      //     }
      //     else if (num__ == 5) {
      //       period_num = ["11.50-12.40"];
           
      //       period_count.push(num__);
      //     }
      //     else if (num__ == 6) {
      //       period_num = ["12.40-13.30"];
       
      //       period_count.push(num__);
      //     }
      //     else if (num__ == 7) {
      //       period_num = ["13.30-14.20"];
 
      //       period_count.push(num__);
      //     }
      //     else if (num__ == 8) {
      //       period_num = ["14.20-15.10"];
            
      //       period_count.push(num__);
      //     }
      //     else if (num__ == 9) {
      //       period_num = ["15.10-16.00"];
            
      //       period_count.push(num__);
      //     }

      //     // period_num.push(iterator.period);
      //     num__++;
      //   }

      //   if (period_count.filter((p) => p == iterator.hours).length == 0) {
      //     if (num__ == 0) {
      //       period_num.push("8.00-8.30");
      //       period_count.push(num__);
      //     }
      //     else if (num__ == 1) {
      //       period_num.push("8.30-9.20");
      //       period_count.push(num__);
      //     }
      //     else if (num__ == 2) {
      //       period_num.push("9.20-10.10");
      //       period_count.push(num__);
      //     }
      //     else if (num__ == 3) {
      //       period_num.push("10.10-11.00");
      //       period_count.push(num__);
      //     }
      //     else if (num__ == 4) {
      //       period_num.push("11.00-11.50");
      //       period_count.push(num__);
      //     }
      //     else if (num__ == 5) {
      //       period_num.push("11.50-12.40");
      //       period_count.push(num__);
      //     }
      //     else if (num__ == 6) {
      //       period_num.push("12.40-13.30");
      //       period_count.push(num__);
      //     }
      //     else if (num__ == 7) {
      //       period_num.push("13.30-14.20");
      //       period_count.push(num__);
      //     }
      //     else if (num__ == 8) {
      //       period_num.push("14.20-15.10");
      //       period_count.push(num__);
      //     }
      //     else if (num__ == 9) {
      //       period_num.push("15.10-16.00");
      //       period_count.push(num__);
      //     }
      //     // period_count.push(iterator.hours);
      //   }

      // }

      // let period_num = [];
      // let period_count = [];
      // let num__ = 1;
      // for await (const iterator of _res) {
      //   if (period_num.filter((p) => p == iterator.period).length == 0) {
      //     if (num__ == 5) {
      //       period_num.push("11:50-13:00");
      //       period_count.push(iterator.hours);
      //       period_count.push(num__);
      //     }
      //     period_num.push(iterator.period);
      //     period_count.push(iterator.hours);
      //     num__++;
      //   } 
      // }
      const day = ["", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"];
      const dayNum = [1, 2, 3, 4, 5];
      let data = [];
      let num = 1;
      for await (const iterator of _res) {
        let form = {
          day: iterator.date,
          hours: iterator.hours,
          room_code: iterator.room_code,
          subject_code: iterator.subject_code,
          subject_name: iterator.subject_name,
          teacher_title: iterator.teacher_title,
          teacher_firstname: iterator.teacher_firstname,
          teacher_lastname: iterator.teacher_lastname,
          period: iterator.period,
          room_name: iterator.room_name,
          classroom_name: iterator.classroom_name,
        };
        data.push(form);
        num++;
      }

      let result = [];
      for (const iterator of dayNum) {
        data.push({
          subject_name: "พักกลางวัน",
          subject_code: "LUNCH",
          period: "11.50-12.40",
          day: iterator,
        });
        let data_period = [];
        for (let index = 0; index < period_num.length; index++) {
          const period = period_num[index];
          let dataByDay = data.find(
            (d) => d.period == period && d.day == iterator
          );
          data_period.push({ ...dataByDay });
        }

        let form = {
          day: day[iterator],
          type: iterator,
          periods: period_num,
          periodsCount: period_count,
          period: data_period ? data_period : [],
        };
        result.push(form);
      }

      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.schedule_teacher_status = async (req, res) => {

  date_ob = new Date();
  const date_now = con_date_now(date_ob);
  console.log(req.body)
  var data = [];
  for await(const iterator of req.body) {
   await db.sequelize
    .query(
      `SELECT 
      CASE
        WHEN 
          COUNT(student_code) > 0 THEN 'Y'
          ELSE 'N'
        END AS 'Status'
    FROM checkin_classroom 
    WHERE checkin_classroom_code = '${iterator.classroom_code}' AND schedule_code = '${iterator.schedule_code}' AND CAST(datetime as date) = '${date_now}' AND teacher_code = '${iterator.teacher_code}'`,
      { type: QueryTypes.SELECT }
    )
    .then((result) => {
      data.push({ ...iterator, status:result[0].Status },);
      
    })
  }
  
  // console.log('------------------>',data)

  setTimeout(() => {
    res.send(data);
  }, 100);
  
    
};

exports.schedule_teacher_list = async (req, res) => {
  db.sequelize
    .query(
      `select  ts.schedule_code,ts.period,ts.hours,tms2.subject_code,tms2.subject_name  ,tms2.subject_name , tmc.classroom_name ,tmc.classroom_code ,
tmt.teacher_code ,tmt.title ,tmt.firstname ,tmt.lastname,tmr.room_code ,tmr.room_name 
from t_schedule ts
join t_master_teacher tmt on tmt.teacher_code = ts.teacher_code
join t_master_classroom tmc  on tmc.classroom_code  = ts.classroom_code
join t_master_subject tms2 on tms2.subject_code =ts.subject_code
left join t_master_room tmr  on tmr.room_code  = ts.room_code 
where tmt.teacher_code = '${req.body.teacher_code}' and ts.date = '${req.body.date}' order by ts.hours`,
      { type: QueryTypes.SELECT }
    )
    .then((_res) => {
      res.send(_res);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.schedule_teacher_view = async (req, res) => {
  db.sequelize
    .query(
      `select  ts.schedule_code,ts.period,ts.hours,tms.picture, tms.student_code,tms.title ,tms.firstname ,tms.lastname ,ts.schedule_code ,tms2.subject_code,
      tms2.subject_name  ,tms2.subject_name , tmc.classroom_name ,tmc.classroom_code ,
      cf.timein as status_facescan  ,cc.datetime as status_classroom,tmr.room_code ,tmr.room_name 
      from t_schedule ts	
      join t_master_classroom tmc  on tmc.classroom_code  = ts.classroom_code
      join t_master_subject tms2 on tms2.subject_code =ts.subject_code
       join t_master_student tms on tms.classroom_code =  ts.classroom_code
       left join checkin_facescan cf on cf.facescan_code  = tms.student_code   and tms.student_code = cf.facescan_code and  CAST(cf.timein as date) =CAST(NOW()as date) 
       left join checkin_classroom cc on cc.schedule_code  =ts.schedule_code     
       and tms.student_code = cc.student_code and  CAST(cc.datetime as date) =CAST(NOW()as date) 
       left join t_master_room tmr  on tmr.room_code  = ts.room_code 
 where ts.schedule_code = '${req.body.schedule_code}'  order by  tms.student_code`,
      { type: QueryTypes.SELECT }
    )
    .then((_res) => {
      res.send(_res);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.schedule_student_list = async (req, res) => {
  db.sequelize
    .query(
      `select  tms.title, tms.firstname, tms.lastname,  ts.schedule_code,ts.period,ts.hours ,
     ts.\`date\`, tms2.subject_code, tms2.subject_name, tmc.classroom_name, tmc.classroom_code,
    tmt.teacher_code, tmt.title as teacher_title,
    tmt.firstname as teacher_firstname, tmt.lastname as teacher_lastname,tmr.room_code ,tmr.room_name 
    from t_schedule ts
   join t_master_teacher tmt on tmt.teacher_code = ts.teacher_code
    join t_master_classroom tmc  on tmc.classroom_code = ts.classroom_code
    join t_master_subject tms2 on tms2.subject_code = ts.subject_code
    join t_master_student tms on tms.classroom_code = ts.classroom_code
      join t_master_room tmr  on tmr.room_code  = ts.room_code 
    where tms.student_code =  '${req.body.student_code}' and ts.\`date\` = '${req.body.date}' `,
      { type: QueryTypes.SELECT }
    )
    .then((_res) => {
      res.send(_res);
    })
    .catch((err) => {
      console.log(err);
    });
};
