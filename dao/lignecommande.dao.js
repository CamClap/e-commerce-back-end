const connection = require('../database.js');

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM lignecommande", (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};
exports.getOneById = (id) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM lignecommande WHERE id  = ? ", id, (err, result) => {
            console.log(req.sql)
            err || result.length == 0 ? reject(err) : resolve(result);
        });
    });
};

exports.add = (lc) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("INSERT INTO lignecommande SET id = ?, quantiteCommande = ?, refArticle = ?, numCommande = ?", 
        [lc.id, lc.quantiteCommande, lc.refArticle, lc.numCommande], (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};
exports.edit = (id, lc) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("UPDATE lignecommande SET ? WHERE id = ?", [lc, id], (err, result) => {
            console.log(req.sql)
            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });
};
exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("DELETE FROM lignecommande WHERE id = ?", id, (err, result) => {
            console.log(req.sql)
            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });
};