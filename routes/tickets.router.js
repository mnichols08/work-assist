var express = require('express');
var router = express.Router();

const { index, create, read, update, updateCustomer, remove } = require('../controls/tickets.controller')

router.get('/', index)
router.get('/:id', read )
router.delete('/:id', remove )
router.post('/:id', create)
router.post('/', create)
router.patch('/:id/:customerID', updateCustomer)
router.patch('/:id', update)
router.delete('/', remove )

module.exports = router;