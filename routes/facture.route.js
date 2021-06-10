const express = require('express');
const router = express.Router();
const factureController = require('../controllers/facture.controller');

router.get('/', factureController.getAll);
// router.get('/:id', factureController.getOneById);
router.post('/', factureController.add);
router.put('/:id', factureController.edit);
router.delete('/:id', factureController.delete);

module.exports = router;