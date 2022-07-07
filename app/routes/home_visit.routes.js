module.exports = app => {
    const homevisit = require("../controllers/homevisit.controller.js");
    var router = require("express").Router();

    router.post("/", homevisit.create);
    router.get("/", homevisit.findAll);
    router.post("/findOne", homevisit.findOne);
    router.put("/:id", homevisit.update);
    router.delete("/:id", homevisit.delete);
    router.post("/report", homevisit.report_homevisit);
    router.post("/test_add",homevisit.test_add);
    app.use('/api/smartschool/homevisit', router);
};