var nodemailer = require('nodemailer');
const config = require("../config/auth.config");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.email,//'adisornestth@gmail.com',
        pass: config.pss,//'---'
    }
});

veriFymail = (req, res) => {
    console.log(req.to);
    let _from = req.from;
    let _to = req.to;
    let _subject = req.subject;
    let _text = req.text;

    var mailOptions = {
        from: _from,
        to: _to,
        subject: _subject,
        text: _text
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    return;
};
const sendMail = {
    veriFymail: veriFymail,
};
// module.exports = authJwt;
module.exports = sendMail;