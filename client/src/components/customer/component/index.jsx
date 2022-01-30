import React, { Component } from 'react'
import Ticket from "../../ticket/component"

import styles from './styles'

class Customer extends Component {
    constructor(props){
        super(props)
        this.state = {customer: props.customer, tickets: props.tickets}
        this.newTicket = this.newTicket.bind(this)
        this.deleteTicket = this.deleteTicket.bind(this)
    }
    newTicket(ticket) {
        const customerID = this.props.match.params.id
        this.props.newTicket({ticket, customerID})
   
    }
    deleteTicket(id) {
        console.log(id)
    }
    componentDidMount(){
        this.props.findCustomer(this.props.match.params.id)
    }
    render() {
        
        const { customer, tickets } = this.state
       const filteredTickets = tickets.filter(ticket => ticket.origin === customer._id)
        return (
            <div >
                
                <div >
                    <p>Customer Name: {customer.name}</p>
                    <p>Phone Number: {customer.phone} </p>
                    <p>Open Tickets: </p>

                    <Ticket customer={customer} tickets={filteredTickets} deleteTicket={this.deleteTicket} newTicket={this.newTicket}  />

                </div>

            </div>
        )
    }
}

export default styles(Customer)