const express = require('express')
const { create, read, update, remove, removeNotes } = require('../controls/customers.controller')
const router = express.Router()

router.get('/', read)
router.post('/', create)
router.get('/:id', read)
router.patch('/:id', update)
router.delete('/remove', remove)
router.delete('/remove/:arg', removeNotes)

 router.delete('/:id', remove)
 router.delete('/:id/remove', removeNotes)

module.exports = router