const connection = require('../database.js');

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM auteur", (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};
exports.getOneById = (id) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM auteur WHERE id  = ? ", id, (err, result) => {
            console.log(req.sql)
            err || result.length == 0 ? reject(err) : resolve(result);
        });
    });
};

exports.add = (a) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("INSERT INTO auteur SET nom = ?, prenom = ?", [a.nom, a.prenom], (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};
exports.edit = (id, a) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("UPDATE auteur SET ? WHERE id = ?", [a, id], (err, result) => {
            console.log(req.sql)
            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });
};
exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("DELETE FROM auteur WHERE id = ?", id, (err, result) => {
            console.log(req.sql)
            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });
};