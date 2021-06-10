const utilisateur = require("../models/utilisateur");
const utilisateurDao = require('../dao/utilisateur.dao');

exports.connexion = (req, res, next) => {
    const u = new utilisateur.Utilisateur(
        req.body.email,
        req.body.mdp
    );
    
    utilisateurDao.getOneByEmailAndPassword(u.nom, u.prenom)
        .then(result => {
            console.log(result)
            return res.status(200).json(result[0]);
        })
        .catch(err => {
            return res.status(500).json({
                error: `problème de récupération de données: ${err}`
            });
        });
}