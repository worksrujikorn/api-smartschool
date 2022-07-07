module.exports = app => {
    const behaviour = require("../controllers/behaviour.controller");
    var router = require("express").Router();
    router.get('/behaviourbyid/:student_code', behaviour.studentscorebyid);
    router.get('/allbehaviour', behaviour.findAll);
    router.get('/behaviourbyid/:id', behaviour.findOne);
    router.post('/sendbehaviour', behaviour.behaviour_send);
    router.post('/behaviour_list', behaviour.behaviour_list);
    router.post('/onebehaviour', behaviour.OneBahav);
    router.post('/create_behaviour', behaviour.create_behaviour);
    router.put('/update_behaviour/:id', behaviour.update_behaviour);
    router.delete('/delete_behaviour/:id', behaviour.delete_behaviour);
    app.use('/api/smartschool/behaviour', router);

};