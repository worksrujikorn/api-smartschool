module.exports = app => {

    var router = require("express").Router();
    const sso = require("../controllers/sso.controller");

    router.post('/link', sso.getLink);
    app.use('/api/smartschool/sso', router);

};