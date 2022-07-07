module.exports = app => {
    const moodle = require("../controllers/moodle.controller.js");
    var router = require("express").Router();
 
    router.get("/",moodle.get_mdl_user);

    app.use('/api/smartschool/moodle', router);

}