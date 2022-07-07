module.exports = app => {
    const facescan = require("../controllers/facescan.controller.js");
    var router = require("express").Router();

    router.get("/:name",facescan.getallfacescan);
    router.post("/student",facescan.receivefacescan);
    router.post("/teacher",facescan.receivefacescanteacher);
    router.post("/facescan_by_admin",facescan.receivefacescan_by_admin)
    router.post("/facescanteacher_by_admin",facescan.receivefacescanteacher_by_admin)

    app.use('/api/smartschool/facescan', router);

}