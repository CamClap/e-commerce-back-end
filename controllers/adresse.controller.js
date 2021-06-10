const adresse = require("../models/adresse");
const adresseDao = require('../dao/adresse.dao');

exports.add = (req, res, next) => {
    const a = new adresse.Adresse(
        req.body.num,
        req.body.rue,
        req.body.cp,
        req.body.ville,
        req.body.complement
    );
    adresseDao.add(a)
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