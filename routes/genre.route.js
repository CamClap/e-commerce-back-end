const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre.controller');

router.get('/', genreController.getAll);
router.get('/:id', genreController.getOne);
router.post('/', genreController.add);
router.put('/:id', genreController.edit);
router.delete('/:id', genreController.delete);

module.exports = router;