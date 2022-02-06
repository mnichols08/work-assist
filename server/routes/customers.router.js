const express = require('express')
const { create, read, update, remove, removeOne, removeTickets, clearTickets } = require('../controls/customers.controller')
const router = express.Router()

router.get('/', read)
router.post('/', create)
router.get('/:id', read)

router.patch('/clear', clearTickets)
router.patch('/:id/clear', clearTickets)
router.patch('/:id', update)

router.delete('/remove/:arg', removeTickets)
router.delete('/remove', removeTickets)
router.delete('/:id/remove', removeTickets)
router.delete('/:id', removeOne)


module.exports = router