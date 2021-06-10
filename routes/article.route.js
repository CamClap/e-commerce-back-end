const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.controller');

router.get('/', articleController.getAll);
router.get('/:id', articleController.getOneByRef);
router.post('/', articleController.add);
router.put('/:id', articleController.edit);
router.put('/stock/:id', articleController.retireStock);
router.delete('/:id', articleController.delete);

module.exports = router;