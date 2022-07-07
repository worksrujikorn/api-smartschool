module.exports = app => {
    const parents = require("../controllers/parent.controller.js");
    var router = require("express").Router();
    router.post("/add", parents.create);
    router.put("/update/:id", parents.update);
    router.get("/:id",parents.findOne);
    router.get("/findbyidcard/:idcard",parents.findbyidcard);
    router.get("/",parents.findAll);
    router.delete("/delete/:id",parents.delete);

    app.use('/api/smartschool/parent', router);

}