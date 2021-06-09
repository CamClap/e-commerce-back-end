const express = require('express');
const router = express.Router();
const auteurController = require('../controllers/auteur.controller');

router.get('/', auteurController.getAll);
router.get('/:id', auteurController.getOneById);
router.post('/', auteurController.add);
router.put('/:id', auteurController.edit);
router.delete('/:id', auteurController.delete);

module.exports = router;