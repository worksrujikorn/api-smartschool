const db = require("../models");
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');


const test_test = db.test_test;


exports.test = (req, res) => {
    test_test.findAll({
        where: {
            [Op.or]: [
                { detail: 'test1' },
                { detail: 'test2' }
            ]
        }
        })
        // select * from test_test where detail ='test1' and detail ='test2'
    // data = ตัวแปร
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Students."
            });
        });
}

exports.queryTest=(req,res)=>
{
    console.log(req.params.search);
    let search = req.params.search;
    db.sequelize.query(`select * from test_test WHERE detail='${search}'`,
        { type: QueryTypes.SELECT }).then((_res) => {
            // console.log(_res);
            res.send(_res);
        }).catch((err) => {
            console.log(err);
        });
}
