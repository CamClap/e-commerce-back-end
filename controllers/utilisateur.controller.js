const utilisateur = require("../models/utilisateur");
// const adresse = require("../models/adresse");
const utilisateurDao = require("../dao/utilisateur.dao");
const adresseDao = require("../dao/adresse.dao");

exports.add = async (req, res, next) => {
  const u = new utilisateur.Utilisateur(
    req.body.nom,
    req.body.prenom,
    req.body.email,
    req.body.mdp,
    req.body.adresse,
    req.body.adresseLivraison
  );

  const result1 = await adresseDao.add(u.adresse).catch((err) => {
    return res.status(500).json({
      error: `problème d'insertion dans adresse : ${err}`,
    });
  });
  u.adresse.id = result1.insertId;
  const result2 = await adresseDao.add(u.adresseLivraison).catch((err) => {
    console.log(u.adresseLivraison);
    return res.status(500).json({
      error: `problème d'insertion dans adresse : ${err}`,
    });
  });
  u.adresseLivraison.id = result2.insertId;
  let result = await utilisateurDao.add(u).catch((err) => {
    return res.status(500).json({
      error: `problème d'insertion dans personne: ${err}`,
    });
  });
  u.id = result.insertId;
  return res.status(201).json(u);
};
