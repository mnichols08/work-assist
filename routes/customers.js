var express = require('express');
var router = express.Router();

var storage = require('../fakeStorage/fakeData')
var customers = storage.customers

/* index of customers by name */
router.get('/', function(req, res, next) {
    res.json(customers.map(e => e.name))
});

/* add new customer object */
router.post('/add', function(req, res, next) {
    const data = req.body
    customers.push(data)
    res.json({status: 'success', data })
})

/* get customer by id */
router.get('/:id', function(req, res, next) {
    storage.notes.forEach(note => {
        if (note.assignedTo === customers[req.params.id].name && !customers[req.params.id].notes.includes(note)) customers[req.params.id].notes.push(note)
    })
    res.json(customers[req.params.id] )
})

/* remove a customer by id */
router.delete('/:id', function(req, res, next) {
    let removedCustomer = customers[req.params.id];
    const index = customers.indexOf(customers[req.params.id]);

  customers.splice(index, 1);

    res.json({status: 'success', data: `Successfully removed ${removedCustomer.name} from database.`})
})

/* update customer by id */
router.patch('/:id', function(req, res, next) {
    customers[req.params.id] = req.body
    res.json({ status: 'success', data: req.body}) 
})

module.exports = router;
