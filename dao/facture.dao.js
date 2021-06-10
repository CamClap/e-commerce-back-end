const connection = require('../database.js');

exports.add = (f) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("INSERT INTO facture (dateFacture) VALUES (?)", f.date, (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};