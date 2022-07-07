module.exports = app => {
    const students = require("../controllers/student.controller");
    const schedule = require("../controllers/schedule.controller");
    var router = require("express").Router();

    router.post("/add", students.create);
    router.put("/update/:id", students.update);
    router.get("/:id",students.findOne);
    router.get("/",students.findAll);
    router.delete("/delete/:id",students.delete);
    router.post("/classroom_student", students.classroom_student);
    router.get("/studentscore/:id", students.studentscore);
    router.get("/studenttime/:id", students.studenttime);
    router.post("/allsubjects", students.studentsubjects);

    router.post("/schedule", schedule.schdule_student);
    router.post("/schedule_student_period", schedule.schedule_student_period);


    
    app.use('/api/smartschool/student', router);
};  