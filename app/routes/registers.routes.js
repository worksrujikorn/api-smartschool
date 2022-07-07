module.exports = app => {
    const registers = require("../controllers/registers.controller.js");
    const { authJwt } = require("../middleware");
    const upload = require("../middleware/upload");
    var router = require("express").Router();

    router.post("/", registers.create);
    router.get("/", registers.findAll);
    router.get("/byname/:name", registers.findbyname_);
    router.get("/:id", registers.findOne);
    router.put("/:id", registers.update);
    router.delete("/:id", registers.delete);

    router.post('/upload', upload.single('image'), async (req, res) => {
        registers.Saveimage(req, res)
      });
      
      router.post("/sendToEMail", registers.sendToEMail);
      
    app.use(' /api/smartschool/registers',[authJwt.verifyToken], router);
};