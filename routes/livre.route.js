const express = require('express');
const router = express.Router();
const livreController = require('../controllers/livre.controller');

router.get('/', livreController.getAll);
router.get('/:id', livreController.getOneByRef);
router.post('/', livreController.add);
router.put('/:id', livreController.edit);
router.delete('/:id', livreController.delete);

module.exports = router;