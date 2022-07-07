module.exports = app => {
    const news = require("../controllers/news.controller");
    var router = require("express").Router();

    router.post("/add", news.create);
    router.put("/update/:id", news.update);
    router.get("/:id",news.findOne);
    router.get("/get/all",news.findAll);
    router.get("/",news.findAll_Date);
    router.post("/getstatus",news.findAll_Status);
    router.post("/countactive/allnews", news.CountAll_Date);
    router.delete("/delete/:id",news.delete);
    // router.post("/schedule", schedule.schdule_student);

    app.use('/api/smartschool/news', router);
};  