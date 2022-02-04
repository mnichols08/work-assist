var express = require('express');
var router = express.Router();

const { index, create, read, update, updateNote, remove } = require('../controls/notes.controller')

router.get('/', index)
router.get('/:id', read )
router.delete('/:id', remove )
router.post('/:id', create)
router.post('/', create)
router.patch('/:id/:ticketID', updateNote)
router.patch('/:id', update)
router.delete('/', remove )

module.exports = router;