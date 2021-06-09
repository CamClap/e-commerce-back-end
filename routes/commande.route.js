const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commande.controller');

router.get('/', commandeController.getAll);
router.get('/:id', commandeController.getOneByNum);
router.post('/', commandeController.add);
router.put('/:id', commandeController.edit);
router.delete('/:id', commandeController.delete);

module.exports = router;