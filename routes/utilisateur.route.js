const express = require('express');
const router = express.Router();
const utilisateurControler = require('../controllers/utilisateur.controller');

router.post('/', utilisateurControler.add);