const connection = require('../database.js');

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM commandeFacture", (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};
exports.getOneById = (id) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM commandeFacture WHERE id  = ? ", id, (err, result) => {
            console.log(req.sql)
            err || result.length == 0 ? reject(err) : resolve(result);
        });
    });
};

exports.add = (cf) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("INSERT INTO commandeFacture (numCommande, numFacture) VALUES (?, ?)", 
        [cf.numCommande, cf.numFacture], (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};
exports.edit = (id, c) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("UPDATE commandeFacture SET ? WHERE id = ?", [c, id], (err, result) => {
            console.log(req.sql)
            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });
};
exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("DELETE FROM commandeFacture WHERE id = ?", id, (err, result) => {
            console.log(req.sql)
            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });
};