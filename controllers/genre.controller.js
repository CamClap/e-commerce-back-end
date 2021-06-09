const genre = require("../models/genre");
const genreDao = require('../dao/genre.dao');

exports.getAll = (req, res, next) => {
    genreDao.getAll()
        .then(result => res.status(200).json(result))
        .catch(err => {
            return res.status(500).json({
                error: `problème de récupération de donnees: ${err}`
            })
        });
}
exports.getOne = (req, res, next) => {
    const nom = parseInt(req.params.nom);
    genreDao.getOne(nom)
        .then(result => res.status(200).json(result[0]))
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucun genre ayant pour nom ${nom}`
                });
            }
            return res.status(500).json({
                error: `problème de récupération de données : ${err}`
            });
        });
}
exports.add = (req, res, next) => {
    const a = new genre.genre(
        req.body.nom
    );
    genreDao.add(nom)
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
    const a = new genre.genre(
        req.body.nom
    );
    genreDao.edit(nom, a)
        .then(result => {
            return res.status(200).json({
                message: `genre avec le nom ${nom} modifiée avec succès`
            });
        })
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucun genre ayant pour nom ${nom}`
                });
            }
            return res.status(500).json({
                error: `problème de mise à jour : ${err}`
            });
        });
}
exports.delete = (req, res, next) => {
    const nom = parseInt(req.params.nom);
    genreDao.delete(nom)
        .then(result => {
            return res.status(200).json({
                message: `Le genre ${nom} supprimée avec succès`
            });
        })
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucun genre ayant pour ${nom}`
                });
            }
            return res.status(500).json({
                error: `problème de suppression : ${err}`
            });
        });
}
