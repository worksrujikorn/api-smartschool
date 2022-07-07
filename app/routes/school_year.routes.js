module.exports = app => {
    const school_year = require("../controllers/school_year.controller");
    const { authJwt } = require("../middleware");
    var router = require("express").Router();

    router.post('/create_school_year',school_year.create_school_year);
    router.get('/get_school_year_all',school_year.get_school_year_all);
    router.get('/get_school_year_one/:id',school_year.get_school_year_one);
    router.put("/update_school_year/:id", school_year.update_school_year);
    router.delete("/delete_school_year/:id", school_year.delete_school_year);


    router.get("/get_school_color", school_year.get_school_color);
    router.get("/get_school_color_suanphueng", school_year.get_school_color_suanphueng);
    router.post("/post_update_school_color_suanphueng", school_year.post_update_school_color_suanphueng);
    router.post("/post_update_school_color", school_year.post_update_school_color);
    router.get("/get_year", school_year.get_year);
    router.get("/get_term", school_year.get_term);
   
    app.use('/api/smartschool/school_year', router);
    // app.use(' /api/smartschool/checkin_line',[authJwt.verifyToken], router);
};  