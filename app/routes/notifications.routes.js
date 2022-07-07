module.exports = app => {
    const noti = require("../controllers/notifications.controller.js");
    var router = require("express").Router();

    router.post("/list", noti.notifications_list);
    router.post("/send", noti.notifications_send);
    router.post("/news", noti.notifications_news);
    router.post("/notifications_login", noti.notifications_login);
    router.post("/notifications_logout", noti.notifications_logout);
    router.get("/notifications_select", noti.notifications_select);
    router.get("/notifications_chkout", noti.notifications_chkout);
    router.post("/notifications_teacher", noti.notifications_teacher);
    app.use('/api/smartschool/notification', router);
};