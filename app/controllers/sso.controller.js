const axios = require('axios');
const db = require("../models");
const config = require("../config/sso.config");
var bcrypt = require("bcryptjs");

const User = db.t_login;
exports.getLink =
    async (req, res) => {
        User.findOne({
            where: {
                token: req.body.token
            }
        })
            .then(user => {
                if (!user) {
                    return res.status(404).send({ message: "User Not found." });
                }
                // var passwordIsValid = bcrypt.compareSync(
                //     req.body.password,
                //     user.password
                // );
                // if (!passwordIsValid) {
                //     return res.status(401).send({
                //         accessToken: null,
                //         message: "Invalid Password!"
                //     });
                // }

                axios.get('https://noodee.net/webservice/rest/server.php?wstoken=' + config.token + '&wsfunction=' + config.functionname + '&moodlewsrestformat=json&user[username]=' + user.username)
                    .then(function (response) {
                        res.status(200).send(
                            response.data
                        )
                    })
                    .catch(function (error) {
                        throw Error(error)
                    })
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    }
