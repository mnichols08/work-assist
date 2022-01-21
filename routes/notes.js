var express = require('express');
var router = express.Router();

var tempStorage = require('../fakeStorage/fakeData')
var customers = tempStorage.customers
const notes = tempStorage.notes

/* index of notes over time */
router.get('/', function(req, res, next) {
    customers.forEach(customer => {
        customer.notes.forEach(note => note.assignedTo = customer.name)
        if (customer.notes.length > 0) customer.notes.forEach(note => {
            if (!notes.includes(note)) notes.push(note)
        })
    })
    res.json({status: 'success', notes })
});

/* add new note */
router.post('/add', function(req, res, next) {
    const data = req.body
    if (!notes.includes(data)) notes.push(data)
    res.json({status: 'success', data })
})

/* get note by id */
router.get('/:id', function(req, res, next) {
    res.json( tempStorage[req.params.id] )
})

/* remove a note by id */
router.delete('/:id', function(req, res, next) {
    let removedCustomer = tempStorage[req.params.id];
    const index = tempStorage.indexOf(tempStorage[req.params.id]);

  tempStorage.splice(index, 1);

    res.json({status: 'success', data: `Successfully removed ${removedCustomer} from database.`})
})

/* update a note by id */
router.post('/:id', function(req, res, next) {
    console.log(req.body)
tempStorage[req.params.id] = req.body

    res.json({status: 'success', data: req.body })
})
/*  */
/*  */
/*  */
/*  */
module.exports = router;
