var mongoose = require('mongoose');

const Customer = require('../models/customer.model')
const Note = require('../models/note.model')

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

module.exports.clearNotes = async (req, res) => {
  if (await Customer.findById(req.params.id)){
    const customer = await Customer.findById(req.params.id)
    const notes = customer.notes.forEach(async id => {
      const note = await Note.findById(id)
      note.origin = undefined
      note.save()
    })
    customer.notes = []
    customer.save()
  } 
  else {
    const customers = await Customer.find()
    const notes = customers.map(customer => customer.notes)
    notes.forEach(note => {
      note.forEach(async id => {
        const note = await Note.findById(id)
        note.origin = undefined
        note.save()
      })
    })
    await Customer.updateMany({notes: []})
  }

  res.json(await Note.find())
  
}

module.exports.removeOne = async (req, res) => {
  if (req.params.id === req.url.slice(1)) res.json
  ({status: 'success', method: 'Remove all Customers and modify note',
    data:  {note: await Note.updateMany({origin: undefined}),
     customer: await Customer.deleteMany()}})
     
}

module.exports.remove = async (req, res) => {
  const data = await Customer.findById(req.params.id)
  let customer = data
  console.log(req.url)
  if (req.url == req.params.id) customer = undefined
  if (req.params.id && customer !== null) {
    customer.notes.map(async noteID => {
      const note = await Note.findById(noteID)
      note.origin = undefined
      note.save()
    })
    customer.delete()
    res.json({status: 'success', method: 'Remove Specific Customer and Modify Notes', data})
  } else if (data !== null) {
    
    const notes = await Note.find()
    notes.map(async noteID => {
      const note = await Note.findById(noteID)

      note.origin = undefined
      note.save()
    })
    await Customer.deleteMany()
    res.json({status: 'success', method: 'Remove All Customers and Modify Notes', data})
  } else res.json({status: 'fail', method: 'Remove All Customers and Modify Notes', data})
}

module.exports.removeNotes = async (req, res) => {
  const { id, arg } = req.params
  console.log(req.url)
  if (id === req.url.slice(1)) res.json('pizza')
  const data = await Customer.findById(id)
  let customer = data
  if (req.url == req.params.id) customer = undefined
  if (!arg && id && customer !== null) {
    customer.notes.map(async noteID => await Note.findByIdAndDelete(noteID))
    customer.delete()
    res.json({status: 'success', method: 'Remove Specific Customer and Notes', data})
  } else {
    const notes = await Note.find()
    notes.map(async noteID => {
      const note = await Note.findById(noteID)
      if (note.origin)
      note.delete()
    })
    await Customer.deleteMany()
    res.json({status: 'success', method: 'Remove All Customers and Notes', data})
  }
}
// module.exports.removeWithNotes = async (req, res) => {
//   const customer = await Customer.findById(req.params.id)
//   customer.notes.map(async noteID => await Note.findByIdAndDelete(noteID))
//   customer.delete()
//   res.json({status: 'success', method: 'Remove Specific Customer and Delete Notes', data: customer})
// }

// module.exports.remove3 = async (req, res) => {
//   let { id } = req.params
//   let flag = req.params.flag === 'notes'
//   let message = {}

//   if (id == 'notes') flag = req.params.id === 'notes', id = undefined
  
//   const customer = await Customer.findById(id)
//   if (!flag && customer == null) {
//     const notes = await Note.find()
//     notes.map(async noteID => {
//       const note = await Note.findById(noteID)
//       note.origin = undefined
//       note.save()
//     })
//     await Customer.deleteMany()
//     message.status = 'success', message.method = 'Remove all customers and update notes associated.', message.data = notes
//   }
//   else if (flag && customer) {
//     customer.notes.map(async noteID => await Note.findByIdAndDelete(noteID))
//     customer.delete()
//     message.status = 'success', message.method = 'Remove all customers and notes associated.', message.data = customer
//   } 
//   if (!flag && customer) {
//     customer.notes.map(async noteID => {
//       const note = await Note.findByIdAndUpdate(noteID)
//       note.origin = undefined
//       note.save()
//     })
//     customer.delete()
//     message.status = 'success', message.method = 'Remove a specific customer and updating notes associated', message.data = customer
//   } else {
//     const notes = await Note.find()
    
//     notes.map(async noteID => {
//       const note = await Note.findById(noteID)
//       if (note.origin) {
//         await Customer.findByIdAndDelete(note.origin)
//         note.delete()
//       }
      
//     })

//     message.status = 'success', message.method = 'Remove all customers and all notes associated with them.', message.data = Customer
//   }
//   res.json(message)
//   }



// module.exports.remove = async (req, res) => {
//   let { id, flag } = req.params
//   let customer
//   if (id == 'notes') flag = id, id = undefined
//   if (id) customer = await Customer.findById(id)
//   if (id && !customer) {
//      res.json({status: 'failure', data: `not found.`})
//   } else if (customer) {
//   if (flag != 'notes'){
//     customer.notes.map(async (noteID) => {
//       const note = await Note.findById(noteID)
//         note.origin = undefined
//         note.save()
//     })} else customer.notes.map(async noteID => await Note.findByIdAndDelete(noteID))
//     res.json({status: 'success', method: 'delete customer and update notes affected', data: customer })
//     await customer.delete()
//   } else {
//     const customers = await Customer.find()
//     await Customer.deleteMany()
//     const notes = await Note.find()
//     notes.map(async (noteID) => {
//       const note = await Note.findById(noteID)
//       note.origin = undefined
//       note.save()
//     })
    
//     res.json({status: 'success', method: 'delete all customers', data: customers})
//   }
// }