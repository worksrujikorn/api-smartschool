module.exports = app => {
    const group = require("../controllers/group.controller");
    const { authJwt } = require("../middleware");
    var router = require("express").Router();

    router.post('/create_group',group.create_group);
    router.get('/get_group_all',group.get_group_all);
    router.get('/get_group_one/:id',group.get_group_one);
    router.put("/update_group/:id", group.update_group);
    router.delete("/delete_group/:id", group.delete_group);

    app.use('/api/smartschool/group', router);
    // app.use('/api/smartschool/checkin_line',[authJwt.verifyToken], router);
};  