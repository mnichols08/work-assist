var mongoose = require('mongoose');

const Customer = require('../models/customer.model')
const Ticket = require('../models/ticket.model')

module.exports.create = async (req, res) => {
  const method = 'Create Customer'
  try {
    const customer = await new Customer(req.body)
    res.json({status: 'success', method, data: await customer.save()})
  } catch (err) { res.json({status: 'fail', method, data: err}) }

}
module.exports.read = async (req, res) => {
  const customer = await Customer.findById(req.params.id)
  if (customer) res.json({status: 'success', method: 'Read Customer', data: customer})
  else res.json({status: 'success', method: 'Customer Index', data: await Customer.find()})
}
module.exports.update = async (req, res) => {
  const method = 'Update Customer'
  const info = await Customer.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) }, req.body)
  const customer = await Customer.findById(req.params.id)
  if (!customer && req.parms.id) res.json({status: 'fail', method, data})
  else res.json({status: 'success', method, data: customer, info })
}

module.exports.clearTickets = async (req, res) => {
  if (await Customer.findById(req.params.id)){
    const customer = await Customer.findById(req.params.id)
    const tickets = customer.tickets.forEach(async id => {
      const ticket = await Ticket.findById(id)
      ticket.origin = undefined
      ticket.save()
    })
    customer.tickets = []
    customer.save()
  } 
  else {
    const customers = await Customer.find()
    const tickets = customers.map(customer => customer.tickets)
    tickets.forEach(ticket => {
      ticket.forEach(async id => {
        const ticket = await Ticket.findById(id)
        ticket.origin = undefined
        ticket.save()
      })
    })
    await Customer.updateMany({tickets: []})
  }

  res.json(await Ticket.find())
  
}

module.exports.removeOne = async (req, res) => {
  if (req.params.id === req.url.slice(1)) res.json
  ({status: 'success', method: 'Remove all Customers and modify ticket',
    data:  {ticket: await Ticket.updateMany({origin: undefined}),
     customer: await Customer.deleteMany()}})
     
}

module.exports.remove = async (req, res) => {
  const data = await Customer.findById(req.params.id)
  let customer = data
  console.log(req.url)
  if (req.url == req.params.id) customer = undefined
  if (req.params.id && customer !== null) {
    customer.tickets.map(async ticketID => {
      const ticket = await Ticket.findById(ticketID)
      ticket.origin = undefined
      ticket.save()
    })
    customer.delete()
    res.json({status: 'success', method: 'Remove Specific Customer and Modify Tickets', data})
  } else if (data !== null) {
    
    const tickets = await Ticket.find()
    tickets.map(async ticketID => {
      const ticket = await Ticket.findById(ticketID)

      ticket.origin = undefined
      ticket.save()
    })
    await Customer.deleteMany()
    res.json({status: 'success', method: 'Remove All Customers and Modify Tickets', data})
  } else res.json({status: 'fail', method: 'Remove All Customers and Modify Tickets', data})
}

module.exports.removeTickets = async (req, res) => {
  const { id, arg } = req.params
  console.log(req.url)
  if (id === req.url.slice(1)) res.json('pizza')
  const data = await Customer.findById(id)
  let customer = data
  if (req.url == req.params.id) customer = undefined
  if (!arg && id && customer !== null) {
    customer.tickets.map(async ticketID => await Ticket.findByIdAndDelete(ticketID))
    customer.delete()
    res.json({status: 'success', method: 'Remove Specific Customer and Tickets', data})
  } else {
    const tickets = await Ticket.find()
    tickets.map(async ticketID => {
      const ticket = await Ticket.findById(ticketID)
      if (ticket.origin)
      ticket.delete()
    })
    await Customer.deleteMany()
    res.json({status: 'success', method: 'Remove All Customers and Tickets', data})
  }
}
// module.exports.removeWithTickets = async (req, res) => {
//   const customer = await Customer.findById(req.params.id)
//   customer.tickets.map(async ticketID => await Ticket.findByIdAndDelete(ticketID))
//   customer.delete()
//   res.json({status: 'success', method: 'Remove Specific Customer and Delete Tickets', data: customer})
// }

// module.exports.remove3 = async (req, res) => {
//   let { id } = req.params
//   let flag = req.params.flag === 'tickets'
//   let message = {}

//   if (id == 'tickets') flag = req.params.id === 'tickets', id = undefined
  
//   const customer = await Customer.findById(id)
//   if (!flag && customer == null) {
//     const tickets = await Ticket.find()
//     tickets.map(async ticketID => {
//       const ticket = await Ticket.findById(ticketID)
//       ticket.origin = undefined
//       ticket.save()
//     })
//     await Customer.deleteMany()
//     message.status = 'success', message.method = 'Remove all customers and update tickets associated.', message.data = tickets
//   }
//   else if (flag && customer) {
//     customer.tickets.map(async ticketID => await Ticket.findByIdAndDelete(ticketID))
//     customer.delete()
//     message.status = 'success', message.method = 'Remove all customers and tickets associated.', message.data = customer
//   } 
//   if (!flag && customer) {
//     customer.tickets.map(async ticketID => {
//       const ticket = await Ticket.findByIdAndUpdate(ticketID)
//       ticket.origin = undefined
//       ticket.save()
//     })
//     customer.delete()
//     message.status = 'success', message.method = 'Remove a specific customer and updating tickets associated', message.data = customer
//   } else {
//     const tickets = await Ticket.find()
    
//     tickets.map(async ticketID => {
//       const ticket = await Ticket.findById(ticketID)
//       if (ticket.origin) {
//         await Customer.findByIdAndDelete(ticket.origin)
//         ticket.delete()
//       }
      
//     })

//     message.status = 'success', message.method = 'Remove all customers and all tickets associated with them.', message.data = Customer
//   }
//   res.json(message)
//   }



// module.exports.remove = async (req, res) => {
//   let { id, flag } = req.params
//   let customer
//   if (id == 'tickets') flag = id, id = undefined
//   if (id) customer = await Customer.findById(id)
//   if (id && !customer) {
//      res.json({status: 'failure', data: `not found.`})
//   } else if (customer) {
//   if (flag != 'tickets'){
//     customer.tickets.map(async (ticketID) => {
//       const ticket = await Ticket.findById(ticketID)
//         ticket.origin = undefined
//         ticket.save()
//     })} else customer.tickets.map(async ticketID => await Ticket.findByIdAndDelete(ticketID))
//     res.json({status: 'success', method: 'delete customer and update tickets affected', data: customer })
//     await customer.delete()
//   } else {
//     const customers = await Customer.find()
//     await Customer.deleteMany()
//     const tickets = await Ticket.find()
//     tickets.map(async (ticketID) => {
//       const ticket = await Ticket.findById(ticketID)
//       ticket.origin = undefined
//       ticket.save()
//     })
    
//     res.json({status: 'success', method: 'delete all customers', data: customers})
//   }
// }