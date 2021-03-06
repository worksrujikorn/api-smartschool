module.exports = app => {
    const checkin_classroom = require("../controllers/checkin_classroom.controller");
    const { authJwt } = require("../middleware");
    var router = require("express").Router();
    router.get("/", checkin_classroom.findAll);
    router.get("/findOne/:id", checkin_classroom.findOne);
    router.post("/create", checkin_classroom.create);
    router.put("/update/:id", checkin_classroom.update);
    router.delete("/delete/:id", checkin_classroom.delete);
    router.post('/create_classroom',checkin_classroom.create_classroom);
    router.post('/checkname_code_classroom',checkin_classroom.checkname_code_classroom);
    router.get('/getall',checkin_classroom.get_classroom_all);
    router.get('/getone/:id',checkin_classroom.get_classroom_one);
    router.put("/update_classroom/:id", checkin_classroom.update_classroom);
    router.delete("/delete_classroom/:id", checkin_classroom.delete_classroom);
    router.get("/get_classroom_level",checkin_classroom.get_classroom_level);
    router.post("/post_student_checkin",checkin_classroom.post_student_checkin);
    app.use('/api/smartschool/checkin_classroom', router);
    // app.use('/api/smartschool/checkin_line',[authJwt.verifyToken], router);
};  