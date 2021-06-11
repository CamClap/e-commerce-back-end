const commande = require("../models/commande");
const commandeDao = require('../dao/commande.dao');
const adminDao = require('../dao/admin.dao');

exports.getBestSell = (req, res, next) => {
    adminDao.getBestSellArticles()
        .then(result => res.status(200).json(result))
        .catch(err => {
            return res.status(500).json({
                error: `problème de récupération de donnees: ${err}`
            })
        });
}