const facture = require("../models/facture");
const factureDao = require('../dao/facture.dao');

exports.getAll = (req, res, next) => {
    factureDao.getAll()
        .then(result => res.status(200).json(result))
        .catch(err => {
            return res.status(500).json({
                error: `problème de récupération de donnees: ${err}`
            })
        });
}
exports.getOneByNum = (req, res, next) => {
    const num = parseInt(req.params.num);
    factureDao.getOneByNum(num)
        .then(result => res.status(200).json(result[0]))
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucune facture avec le numéro ${num}`
                });
            }
            return res.status(500).json({
                error: `problème de récupération de données : ${err}`
            });
        });
}
exports.add = (req, res, next) => {
    const a = new facture.Facture(
        req.body.date
    );
    factureDao.add(a)
        .then(result => {
            a.num = result.insertnum;
            return res.status(201).json(a);
        })
        .catch(err => {
            return res.status(500).json({
                error: `problème d'insertion : ${err}`
            });
        });
}
exports.edit = (req, res, next) => {
    const num = parseInt(req.params.num);
    const a = new facture.Facture(
        req.body.date
    );
    factureDao.edit(num, a)
        .then(result => {
            return res.status(200).json({
                message: `facture avec le numéro ${num} modifiée avec succès`
            });
        })
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucune facture avec le numéro ${num}`
                });
            }
            return res.status(500).json({
                error: `problème de mise à jour : ${err}`
            });
        });
}
exports.delete = (req, res, next) => {
    const num = parseInt(req.params.num);
    factureDao.delete(num)
        .then(result => {
            return res.status(200).json({
                message: `facture avec le numéro ${num} supprimée avec succès`
            });
        })
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucune facture avec le numéro ${num}`
                });
            }
            return res.status(500).json({
                error: `problème de suppression : ${err}`
            });
        });
}
