const connection = require('../database.js');

exports.add = (p) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("INSERT INTO utilisateur SET nom = ?, prenom = ?, email =?, mdp = ?, adresse = ?, adresseLivraison = ?", [p.nom, p.prenom, p.email, p.mdp, p.adresse, p.adresseLivraison], (err, result) => {
                console.log(req.sql)
                err ? reject(err) : resolve(result);
            });
    });
};


exports.getOneByEmailAndPassword = (email, mdp) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM utilisateur WHERE email  = ? AND mdp = ? ", [email, mdp], (err, result) => {
            console.log(req.sql)
            err  ? reject(err) : resolve(result);
        });
    });
};