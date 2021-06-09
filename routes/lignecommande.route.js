const express = require('express');
const router = express.Router();
const ligneCommandeController = require('../controllers/lignecommande.controller');

router.get('/', ligneCommandeController.getAll);
router.get('/:id', ligneCommandeController.getOneById);
router.post('/', ligneCommandeController.add);
router.put('/:id', ligneCommandeController.edit);
router.delete('/:id', ligneCommandeController.delete);

module.exports = router;