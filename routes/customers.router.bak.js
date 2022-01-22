const express = require('express');
const { index, create, read, update, deleteOne, deleteAll } = require('../controls/customers.controller')
const router = express.Router();

router.get('/', index)
router.post('/', create)
router.get('/:id', read)
router.patch('/:id', update)
router.delete('/:id', deleteOne)
router.delete('/', deleteAll)

module.exports = router;