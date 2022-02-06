var express = require('express');
var router = express.Router();

const { index, create, read, update, updateTicket, remove } = require('../controls/tickets.controller')

router.get('/', index)
router.get('/:id', read )
router.delete('/:id', remove )
router.post('/:id', create)
router.post('/', create)
router.patch('/:id/:noteID', updateTicket)
router.patch('/:id', updateTicket)
router.delete('/', remove )

module.exports = router;