const connection = require('../database.js');

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM editeur", (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};
exports.getOne = (nom) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM editeur WHERE nom  = ? ", nom, (err, result) => {
            console.log(req.sql)
            err || result.length == 0 ? reject(err) : resolve(result);
        });
    });
};

exports.add = (nom) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("INSERT INTO editeur SET nom = ?", nom, (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};
exports.edit = (nom, a) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("UPDATE editeur SET ? WHERE nom = ?", [a, nom], (err, result) => {
            console.log(req.sql)
            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });
};
exports.delete = (nom) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("DELETE FROM editeur WHERE nom = ?", nom, (err, result) => {
            console.log(req.sql)
            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });
};