// const { resolve } = require('path/posix');
const connection = require('../database.js');

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM article", (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};
exports.getOneByRef = (ref) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM article WHERE ref  = ? ", ref, (err, result) => {
            console.log(req.sql)
            err || result.length == 0 ? reject(err) : resolve(result);
        });
    });
};
exports.getPrice = (ref) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT prix from article where ref = ?", ref, (err, result) => {
            console.log(req.sql)
            err || result.length == 0 ? reject(err) : resolve(result);
        })
    })
}

exports.add = (a) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("INSERT INTO article VALUES(titre, resume, prix, stock) " + 
        "SET titre = ?, resume = ?, prix = ?, stock = ?", [a.titre, a.resume, a.prix, a.stock], (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};
exports.edit = (ref, a) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("UPDATE article SET ? WHERE ref = ?", [a, ref], (err, result) => {
            console.log(req.sql)
            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });
};
exports.delete = (ref) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("DELETE FROM article WHERE ref = ?", ref, (err, result) => {
            console.log(req.sql)
            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });
};