const commande = require("../models/commande");
const commandeDao = require('../dao/commande.dao');
const lignecommande = require("../models/lignecommande");
const ligneCommandeDao = require('../dao/lignecommande.dao');
const facture = require('../models/facture');
const factureDao = require('../dao/facture.dao');
const commandeFactureDao = require('../dao/commandeFacture.dao');
const commandeFacture = require("../models/commandeFacture");
const articleDao = require('../dao/article.dao');

exports.getAll = (req, res, next) => {
    commandeDao.getAll()
        .then(result => res.status(200).json(result))
        .catch(err => {
            return res.status(500).json({
                error: `problème de récupération de donnees: ${err}`
            })
        });
}
exports.getOneByNum = (req, res, next) => {
    const num = parseInt(req.params.num);
    commandeDao.getOneByNum(num)
        .then(result => res.status(200).json(result[0]))
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucune commande avec le numéro ${num}`
                });
            }
            return res.status(500).json({
                error: `problème de récupération de données : ${err}`
            });
        });
}
exports.add = async (req, res, next) => {
    const currentDate = new Date().toJSON().substr(0, 10);
    const c = new commande.Commande(
        currentDate,
        req.body.total,
        req.body.idUtilisateur
    );
    const f = new facture.Facture(
        currentDate
    );
    const cf = new commandeFacture.CommandeFacture();
    let result = await commandeDao.add(c).catch(err => {
        return res.status(500).json({
            error: `problème d'insertion dans commande: ${err}`
        });
    });
    cf.numCommande = result.insertId;
    c.num = result.insertId;
    for (let lc of req.body.lignesCommande) {
        lc.numCommande = c.num;
        await ligneCommandeDao.add(lc).catch(err => {
            return res.status(500).json({
                error: `problème d'insertion dans lignecommande : ${err}`
            });
        });
        await articleDao.retireStock(lc.refArticle, lc.quantiteCommande).catch(err => {
            return res.status(500).json({
                error: `problème de mise à jour dans article : ${err}`
            });
        });
    }
    result = await factureDao.add(f).catch(err => {
        return res.status(500).json({
            error: `problème d'insertion dans facture: ${err}`
        });
    });
    cf.numFacture = result.insertId;
    await commandeFactureDao.add(cf).catch(err => {
        return res.status(500).json({
            error: `problème d'insertion dans commandeFacture: ${err}`
        });
    });
    return res.status(201).json(c);
}
exports.edit = (req, res, next) => {
    const num = parseInt(req.params.num);
    const a = new commande.commande(
        req.body.num,
        req.body.dateCommande,
        req.body.total,
        req.body.idUtilisateur
    );
    commandeDao.edit(num, a)
        .then(result => {
            return res.status(200).json({
                message: `commande avec le numéro ${num} modifiée avec succès`
            });
        })
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucune commande avec le numéro ${num}`
                });
            }
            return res.status(500).json({
                error: `problème de mise à jour : ${err}`
            });
        });
}
exports.delete = (req, res, next) => {
    const num = parseInt(req.params.num);
    commandeDao.delete(num)
        .then(result => {
            return res.status(200).json({
                message: `commande avec le numéro ${num} supprimée avec succès`
            });
        })
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucune commande avec le numéro ${num}`
                });
            }
            return res.status(500).json({
                error: `problème de suppression : ${err}`
            });
        });
}
