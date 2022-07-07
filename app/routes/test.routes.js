module.exports = app => {
    const test = require("./../controllers/test.controller");
    // const test = require("../controllers/test.controller");
    var router = require("express").Router();

    router.get("/findAll", test.test);
    router.get("/query/:search", test.queryTest);

    app.use('/api/smartschool/test', router);

 

    // http:localhost:8001 /api/smartschool/test/findAll

    // http://localhost:8001 /api/smartschool/test/query/test1
};
