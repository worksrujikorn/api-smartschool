module.exports = app => {
    const teachers = require("../controllers/teacher.controller");
    const schedule = require("../controllers/schedule.controller");

    var router = require("express").Router();
    router.post("/add", teachers.create);
    router.put("/update/:id", teachers.update);
    router.get("/:id", teachers.findOne);
    router.get("/", teachers.findAll);
    router.delete("/delete/:id", teachers.delete);
    router.get("/dashboard/studentgraph/:class", teachers.dashboardstudentoverall);
    router.post("/schedule_student", schedule.schdule_student);
    router.post("/schedule_teacher_status", schedule.schedule_teacher_status);
    router.post("/schedule_teacher_list", schedule.schedule_teacher_list);
    router.post("/schedule_teacher", schedule.schdule_teacher);
    router.post("/schedule_teacher_view", schedule.schedule_teacher_view);
    router.post("/dashboard/schedulejobs", teachers.teacherschdule);
    router.post("/dashboard/teachertime", teachers.teachertime);

    
    router.post("/checkin_list_one", teachers.checkin_list_one);
    router.put("/checkin_list_update_in", teachers.checkin_list_update_in);
    router.put("/checkin_list_update_out", teachers.checkin_list_update_out);

    router.put("/checkin_list_teacher_update_in", teachers.checkin_list_teacher_update_in);
    router.put("/checkin_list_teacher_update_out", teachers.checkin_list_teacher_update_out);

    router.post("/Manage_students_comment", teachers.Manage_students_comment);

    router.get("/leave_get_count/:id", teachers.leave_get_count);
    router.get("/leave_get/:id", teachers.leave_get);
    router.post("/leave_post", teachers.leave_post);
    router.get("/leave_category/get", teachers.leave_category);

    router.get("/moodle_mdl_user/get", teachers.moodle_mdl_user);
    
    app.use('/api/smartschool/teacher', router);
};  