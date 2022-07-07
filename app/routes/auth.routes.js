const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const upload = require("../middleware/upload");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/smartschool/auth/signup",
    [
      // verifySignUp.checkDuplicateUsernameOrEmail,
      // verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  app.post("/api/smartschool/auth/signin", controller.signin);


  app.post('/api/smartschool/upload', upload.single('image'), async (req, res) => {
    console.log(req.body.name  ,req.body.type , req.body.register);
    controller.Saveimage(req, res)
  });


};