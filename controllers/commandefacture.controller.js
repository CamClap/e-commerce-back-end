const commandeFacture = require("../models/commandeFacture");
const commandeFactureDao = require('../dao/commandeFacture.dao');

exports.getAll = (req, res, next) => {
    commandeFactureDao.getAll()
        .then(result => res.status(200).json(result))
        .catch(err => {
            return res.status(500).json({
                error: `problème de récupération de donnees: ${err}`
            })
        });
}
exports.getOneById = (req, res, next) => {
    const id = parseInt(req.params.id);
    commandeFactureDao.getOneById(id)
        .then(result => res.status(200).json(result[0]))
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucune commandeFacture avec l'identifiant ${id}`
                });
            }
            return res.status(500).json({
                error: `problème de récupération de données : ${err}`
            });
        });
}
exports.add = (req, res, next) => {
    const a = new commandeFacture.CommandeFacture(
        req.body.numCommande,
        req.body.commandeFumFacture
    );
    commandeFactureDao.add(a)
        .then(result => {
            a.id = result.insertid;
            return res.status(201).json(a);
        })
        .catch(err => {
            return res.status(500).json({
                error: `problème d'insertion : ${err}`
            });
        });
}
exports.edit = (req, res, next) => {
    const id = parseInt(req.params.id);
    const a = new commandeFacture.CommandeFacture(
        req.body.date
    );
    commandeFactureDao.edit(id, a)
        .then(result => {
            return res.status(200).json({
                message: `commandeFacture avec l'identifiant ${id} modifiée avec succès`
            });
        })
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucune commandeFacture avec l'identifiant ${id}`
                });
            }
            return res.status(500).json({
                error: `problème de mise à jour : ${err}`
            });
        });
}
exports.delete = (req, res, next) => {
    const id = parseInt(req.params.id);
    commandeFactureDao.delete(id)
        .then(result => {
            return res.status(200).json({
                message: `commandeFacture avec l'identifiant ${id} supprimée avec succès`
            });
        })
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucune commandeFacture avec l'identifiant ${id}`
                });
            }
            return res.status(500).json({
                error: `problème de suppression : ${err}`
            });
        });
}
