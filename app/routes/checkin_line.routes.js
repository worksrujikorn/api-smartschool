module.exports = app => {
    const checkin_line = require("../controllers/checkin_line.controller");
    const { authJwt } = require("../middleware");
    var router = require("express").Router();

    router.post("/getall", checkin_line.checkin_line_all);
    router.get("/checkinlist/:class", checkin_line.checkinlist);
    router.put("/update", checkin_line.update_checkin_line);
    router.get("/checkinlist_teacher", checkin_line.checkinlist_teacher);

    app.use('/api/smartschool/checkin_line', router);
    // app.use('/api/smartschool/checkin_line',[authJwt.verifyToken], router);
};  