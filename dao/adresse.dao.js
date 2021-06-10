const connection = require('../database.js');

exports.add = (a) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("INSERT INTO adresse SET num = ?, rue = ?, cp = ?, ville = ?, complement = ?", [a.num, a.rue, a.cp, a.ville, a.complement], (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};