const article = require("../models/article");
const articleDao = require('../dao/article.dao');

exports.getAll = (req, res, next) => {
    articleDao.getAll()
        .then(result => res.status(200).json(result))
        .catch(err => {
            return res.status(500).json({
                error: `problème de récupération de donnees: ${err}`
            })
        });
}
exports.getOneByRef = (req, res, next) => {
    const ref = parseInt(req.params.ref);
    articleDao.getOneByRef(ref)
        .then(result => res.status(200).json(result[0]))
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucun article avec la référence ${ref}`
                });
            }
            return res.status(500).json({
                error: `problème de récupération de données : ${err}`
            });
        });
}
exports.getPrice = (req, res, next) => {
    const ref = parseInt(req.params.ref);
    articleDao.getPrice(ref)
        .then(result => res.status(200).json(result[0]))
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucun article avec la référence ${ref}`
                });
            }
            return res.status(500).json({
                error: `problème de récupération de données : ${err}`
            });
        });
}
exports.add = (req, res, next) => {
    const a = new article.Article(
        req.body.nom,
        req.body.prenom
    );
    articleDao.add(a)
        .then(result => {
            a.ref = result.insertId;
            return res.status(201).json(a);
        })
        .catch(err => {
            return res.status(500).json({
                error: `problème d'insertion : ${err}`
            });
        });
}
exports.edit = (req, res, next) => {
    const ref = parseInt(req.params.ref);
    const a = new article.Article(
        req.body.nom,
        req.body.prenom
    );
    articleDao.edit(ref, a)
        .then(result => {
            return res.status(200).json({
                message: `article avec la référence ${ref} modifiée avec succès`
            });
        })
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucun article avec la référence ${ref}`
                });
            }
            return res.status(500).json({
                error: `problème de mise à jour : ${err}`
            });
        });
}
exports.delete = (req, res, next) => {
    const ref = parseInt(req.params.ref);
    articleDao.delete(ref)
        .then(result => {
            return res.status(200).json({
                message: `article avec la référence ${ref} supprimée avec succès`
            });
        })
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucun article avec la référence ${ref}`
                });
            }
            return res.status(500).json({
                error: `problème de suppression : ${err}`
            });
        });
}
