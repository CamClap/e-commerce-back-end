const utilisateur = require("../models/utilisateur");
const utilisateurDao = require("../dao/utilisateur.dao");
const adresseDao = require("/dao/adresse.dao");

exports.add = async (req, res, next) => {
  const u = new utilisateur.Utilisateur(
    req.body.nom,
    req.body.prenom,
    req.body.email,
    req.body.mdp,
    req.body.adresse,
    req.body.adresseLivraison
  );
  let result = await utilisateurDao.add(u).catch((err) => {
    return res.status(500).json({
      error: `problème d'insertion dans personne: ${err}`,
    });
  });

  await adresseDao.add(u.adresse).catch((err) => {
    return res.status(500).json({
      error: `problème d'insertion dans adresse : ${err}`,
    });
  });
  await adresseDao.add(u.adresseLivraison).catch((err) => {
    return res.status(500).json({
      error: `problème d'insertion dans adresse : ${err}`,
    });
  });
  return res.status(201).json(u);
};
