const express = require('express')
const { create, read, update, remove, removeOne, removeNotes, clearNotes } = require('../controls/customers.controller')
const router = express.Router()

router.get('/', read)
router.post('/', create)
router.get('/:id', read)

router.patch('/clear', clearNotes)
router.patch('/:id/clear', clearNotes)
router.patch('/:id', update)

router.delete('/remove/:arg', removeNotes)
router.delete('/remove', removeNotes)
router.delete('/:id/remove', removeNotes)
router.delete('/:id', removeOne)


module.exports = router