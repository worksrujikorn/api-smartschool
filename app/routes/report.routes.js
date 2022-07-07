module.exports = app => {
    const report = require("../controllers/report.controller.js");
    const { authJwt } = require("../middleware");
    const upload = require("../middleware/upload");
    var router = require("express").Router();

    router.post("/report1", report.report1);
    router.post("/staff", report.reportstafftime);
    // router.get("/", registers.findAll);
    router.post("/daily_time_personnel", report.daily_time_personnel);
    router.post("/daily_time_staff", report.daily_time_staff);
    // router.post("/report_percent_student", report.cal_percent_student);
    app.use('/api/smartschool/report', router);
    // app.use('registers',[authJwt.verifyToken], router);
};