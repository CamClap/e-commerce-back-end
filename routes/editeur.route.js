const express = require('express');
const router = express.Router();
const editeurController = require('../controllers/editeur.controller');

router.get('/', editeurController.getAll);
router.get('/:id', editeurController.getOne);
router.post('/', editeurController.add);
router.put('/:id', editeurController.edit);
router.delete('/:id', editeurController.delete);

module.exports = router;