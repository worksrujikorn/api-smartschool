//library ที่ใช้
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const https = require(`https`);
const fs = require(`fs`);

const options = {
  // key: fs.readFileSync(`/etc/letsencrypt/live/noodee.net/privkey.pem`),
  // cert: fs.readFileSync(`/etc/letsencrypt/live/noodee.net/fullchain.pem`)
};

var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// เรียก path folder ที่ต้องการใช้
global.__basedir = __dirname;

app.use(express.static(__dirname + "/resources/static/assets/uploads"));

// สร้าง Database ตาม model
const db = require("./app/models");
db.sequelize.sync();
// db.sequelize.sync({ force: false }).then(() => {
//     console.log("Drop and re-sync db.");
// });

//  test get api
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

//path router เชื่อม router
require("./app/routes/turorial.routes")(app);
require("./app/routes/student.routes")(app);
require("./app/routes/registers.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/test.routes")(app);
require("./app/routes/parent.routes")(app);
require("./app/routes/teacher.routes")(app);
require("./app/routes/facescan.routes")(app);
require("./app/routes/checkin_line.routes")(app);
require("./app/routes/news.routes")(app);
require("./app/routes/checkin_classroom.routes")(app);
require("./app/routes/notifications.routes")(app);
require("./app/routes/behaviour.routes")(app);
require("./app/routes/moodle.routes")(app);
require("./app/routes/school_year.routes")(app);
require("./app/routes/report.routes")(app);
require("./app/routes/group.routes")(app);
require("./app/routes/sso.routes")(app);
require("./app/routes/home_visit.routes")(app);
// start server
const PORT = process.env.PORT || 3003;
// 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}.`);
});

https.createServer(options, app).listen(3002);

// https.createServer(options, (req, res) => {
//     res.writeHead(200);
//     res.end(`hello world\n`);
//   }).listen(8000);
