const connection = require('../database.js');

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM commande", (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};
exports.getOneByNum = (num) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM commande WHERE num  = ? ", num, (err, result) => {
            console.log(req.sql)
            err || result.length == 0 ? reject(err) : resolve(result);
        });
    });
};

exports.add = (c) => {
    // VERIFIER SI ID UTILISATEUR EST CORRECT
    return new Promise((resolve, reject) => {
        const req = connection.query("INSERT INTO commande SET num = ?, dateCommande = ?, total = ?, idUtilisateur = ?", 
        [c.num, c.dateCommande, c.total, c.idUtilisateur], (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};
exports.edit = (num, c) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("UPDATE commande SET ? WHERE num = ?", [c, num], (err, result) => {
            console.log(req.sql)
            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });
};
exports.delete = (num) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("DELETE FROM commande WHERE num = ?", num, (err, result) => {
            console.log(req.sql)
            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });
};