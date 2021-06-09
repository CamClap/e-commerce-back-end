const editeur = require("../models/editeur");
const editeurDao = require('../dao/editeur.dao');

exports.getAll = (req, res, next) => {
    editeurDao.getAll()
        .then(result => res.status(200).json(result))
        .catch(err => {
            return res.status(500).json({
                error: `problème de récupération de donnees: ${err}`
            })
        });
}
exports.getOne = (req, res, next) => {
    const nom = parseInt(req.params.nom);
    editeurDao.getOne(nom)
        .then(result => res.status(200).json(result[0]))
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucun editeur ayant pour nom ${nom}`
                });
            }
            return res.status(500).json({
                error: `problème de récupération de données : ${err}`
            });
        });
}
exports.add = (req, res, next) => {
    const a = new editeur.editeur(
        req.body.nom
    );
    editeurDao.add(nom)
        .then(result => {
            a.nom = result.insertnom;
            return res.status(201).json(a);
        })
        .catch(err => {
            return res.status(500).json({
                error: `problème d'insertion : ${err}`
            });
        });
}
exports.edit = (req, res, next) => {
    const nom = parseInt(req.params.nom);
    const a = new editeur.editeur(
        req.body.nom
    );
    editeurDao.edit(nom, a)
        .then(result => {
            return res.status(200).json({
                message: `editeur avec le nom ${nom} modifiée avec succès`
            });
        })
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucun editeur ayant pour nom ${nom}`
                });
            }
            return res.status(500).json({
                error: `problème de mise à jour : ${err}`
            });
        });
}
exports.delete = (req, res, next) => {
    const nom = parseInt(req.params.nom);
    editeurDao.delete(nom)
        .then(result => {
            return res.status(200).json({
                message: `Le editeur ${nom} supprimée avec succès`
            });
        })
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucun editeur ayant pour ${nom}`
                });
            }
            return res.status(500).json({
                error: `problème de suppression : ${err}`
            });
        });
}
