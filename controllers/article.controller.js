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
    const ref = parseInt(req.params.id);
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

exports.add = async (req, res, next) => {
    const a = new article.Article(
        req.body.titre,
        req.body.resume,
        req.body.prix,
        req.body.stock,
        req.body.ISBN,
        req.body.image,
        req.body.format
    );
    let result = await articleDao.add(a).catch(err => {
        return res.status(500).json({
            error: `problème d'insertion dans article : ${err}`
        });
    });
    a.ref = result.insertId;
    await articleDao.addLivreArticle(a).catch(err => {
        return res.status(500).json({
            error: `problème d'insertion dans livre : ${err}`
        });
    });

    return res.status(201).json(a);
}

// ne fonctionne pas, à corriger
exports.edit = (req, res, next) => {
    const ref = parseInt(req.params.id);
    const a = new article.Article(
        req.body.titre,
        req.body.resume,
        req.body.prix,
        req.body.stock,
        req.body.ISBN,
        req.body.imageLivre,
        req.body.formatLivre,
        req.body.nomEditeur
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
    const ref = parseInt(req.params.id);
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

exports.retireStock = (req, res, next) => {
    const ref = parseInt(req.params.id);
    let quantiteVendue = req.body.quantiteVendue;
    console.log(quantiteVendue);
    articleDao.retireStock(ref, quantiteVendue)
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