const ligneCommande = require("../models/lignecommande");
const ligneCommandeDao = require('../dao/ligneCommande.dao');

exports.getAll = (req, res, next) => {
    ligneCommandeDao.getAll()
        .then(result => res.status(200).json(result))
        .catch(err => {
            return res.status(500).json({
                error: `problème de récupération de donnees: ${err}`
            })
        });
}
exports.getOneById = (req, res, next) => {
    const id = parseInt(req.params.id);
    ligneCommandeDao.getOneById(id)
        .then(result => res.status(200).json(result[0]))
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucune ligne de commande avec l'identifiant ${id}`
                });
            }
            return res.status(500).json({
                error: `problème de récupération de données : ${err}`
            });
        });
}
exports.add = (req, res, next) => {
    const lc = new ligneCommande.LigneCommande(
        req.body.quantiteCommande,
        req.body.refArticle,
        req.body.numCommande
    );
    ligneCommandeDao.add(lc)
        .then(result => {
            lc.id = result.insertId;
            return res.status(201).json(lc);
        })
        .catch(err => {
            return res.status(500).json({
                error: `problème d'insertion : ${err}`
            });
        });
}
exports.edit = (req, res, next) => {
    const id = parseInt(req.params.id);
    const lc = new ligneCommande.LigneCommande(
        req.body.quantiteCommande,
        req.body.refArticle,
        req.body.numCommande
    );
    ligneCommandeDao.edit(id, lc)
        .then(result => {
            return res.status(200).json({
                message: `ligne de commande avec l'identifiant ${id} modifiée avec succès`
            });
        })
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucune ligne de commande avec l'identifiant ${id}`
                });
            }
            return res.status(500).json({
                error: `problème de mise à jour : ${err}`
            });
        });
}
exports.delete = (req, res, next) => {
    const id = parseInt(req.params.id);
    ligneCommandeDao.delete(id)
        .then(result => {
            return res.status(200).json({
                message: `commande avec l'identifiant ${id} supprimée avec succès`
            });
        })
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucune ligne de commande avec l'identifiant ${id}`
                });
            }
            return res.status(500).json({
                error: `problème de suppression : ${err}`
            });
        });
}
