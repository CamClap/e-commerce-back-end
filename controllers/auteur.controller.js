const auteur = require("../models/auteur");
const auteurDao = require('../dao/auteur.dao');

exports.getAll = (req, res, next) => {
    auteurDao.getAll()
        .then(result => res.status(200).json(result))
        .catch(err => {
            return res.status(500).json({
                error: `problème de récupération de donnees: ${err}`
            })
        });
}
exports.getOneById = (req, res, next) => {
    const id = parseInt(req.params.id);
    auteurDao.getOneById(id)
        .then(result => res.status(200).json(result[0]))
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucun auteur avec l'identifiant ${id}`
                });
            }
            return res.status(500).json({
                error: `problème de récupération de données : ${err}`
            });
        });
}
exports.add = (req, res, next) => {
    const a = new auteur.Auteur(
        req.body.nom,
        req.body.prenom
    );
    auteurDao.add(a)
        .then(result => {
            a.id = result.insertId;
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
    const a = new auteur.Auteur(
        req.body.nom,
        req.body.prenom
    );
    auteurDao.edit(id, a)
        .then(result => {
            return res.status(200).json({
                message: `auteur avec l'identifiant ${id} modifiée avec succès`
            });
        })
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucun auteur avec l'identifiant ${id}`
                });
            }
            return res.status(500).json({
                error: `problème de mise à jour : ${err}`
            });
        });
}
exports.delete = (req, res, next) => {
    const id = parseInt(req.params.id);
    auteurDao.delete(id)
        .then(result => {
            return res.status(200).json({
                message: `auteur avec l'identifiant ${id} supprimée avec succès`
            });
        })
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucun auteur avec l'identifiant ${id}`
                });
            }
            return res.status(500).json({
                error: `problème de suppression : ${err}`
            });
        });
}
