var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

const Customer = require('../models/customer.model')

router.get('/', async function(req, res){
  const customers = await Customer.find({})
  res.json(customers)
})

router.post('/', async function(req, res){
  const customer = new Customer(req.body)
  await customer.save()
  res.json({status: 'success', method: 'create customer', data: customer})
})

router.get('/:id', async function(req, res){
  const { id } = req.params
  const customer = await Customer.findById(id)
  if (!customer) {
    res.json({status: 'failure', method: 'get customer', data: `not found.`})
  } else res.json(customer)
})

router.patch('/:id', async function(req, res){
  const { id } = req.params
  if (!await Customer.findById(id)) {
    res.json({status: 'failure', data: `not found.`})
  } else {
    await Customer.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) },req.body)
    res.json({status: 'success', method: "update customer", data: await Customer.findById(id)})
  }
})

router.delete('/:id', async function(req, res){
  const { id } = req.params
  const customer = await Customer.findById(id)
  if (!customer) {
    res.json({status: 'failure', data: `not found.`})
  } else {
    await Customer.findByIdAndDelete(id)
    res.json({status: 'success', method: 'delete customer', data: customer})
  }
})

router.delete('/', async function(req, res){
  const customers = await Customer.find({})
  await Customer.deleteMany()
  res.json({status: 'success', method: "delete all customers", data: customers})
})

module.exports = router;
