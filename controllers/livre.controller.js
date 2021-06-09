const livre = require("../models/livre");
const livreDao = require('../dao/livre.dao');

exports.getAll = (req, res, next) => {
    livreDao.getAll()
        .then(result => res.status(200).json(result))
        .catch(err => {
            return res.status(500).json({
                error: `problème de récupération de donnees: ${err}`
            })
        });
}
exports.getOneByRef = (req, res, next) => {
    const ref = parseInt(req.params.ref);
    livreDao.getOneByRef(ref)
        .then(result => res.status(200).json(result[0]))
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucun livre avec la référence ${ref}`
                });
            }
            return res.status(500).json({
                error: `problème de récupération de données : ${err}`
            });
        });
}
exports.getPrice = (req, res, next) => {
    const ref = parseInt(req.params.ref);
    livreDao.getPrice(ref)
        .then(result => res.status(200).json(result[0]))
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucun livre avec la référence ${ref}`
                });
            }
            return res.status(500).json({
                error: `problème de récupération de données : ${err}`
            });
        });
}
exports.add = (req, res, next) => {
    const l = new livre.Livre(
        req.body.nom,
        req.body.prenom
    );
    livreDao.add(l)
        .then(result => {
            l.ref = result.insertId;
            return res.status(201).json(l);
        })
        .catch(err => {
            return res.status(500).json({
                error: `problème d'insertion : ${err}`
            });
        });
}
exports.edit = (req, res, next) => {
    const ref = parseInt(req.params.ref);
    const l = new livre.Livre(
        req.body.nom,
        req.body.prenom
    );
    livreDao.edit(ref, l)
        .then(result => {
            return res.status(200).json({
                message: `livre avec la référence ${ref} modifiée avec succès`
            });
        })
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucun livre avec la référence ${ref}`
                });
            }
            return res.status(500).json({
                error: `problème de mise à jour : ${err}`
            });
        });
}
exports.delete = (req, res, next) => {
    const ref = parseInt(req.params.ref);
    livreDao.delete(ref)
        .then(result => {
            return res.status(200).json({
                message: `livre avec la référence ${ref} supprimée avec succès`
            });
        })
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucun livre avec la référence ${ref}`
                });
            }
            return res.status(500).json({
                error: `problème de suppression : ${err}`
            });
        });
}
