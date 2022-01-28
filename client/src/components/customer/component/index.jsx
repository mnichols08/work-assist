import React, { Component } from 'react'
import Ticket from "../../ticket/component"

import styles from './styles'

class Customer extends Component {
    constructor(props){
        super(props)
        this.newTicket = this.newTicket.bind(this)
        this.deleteTicket = this.deleteTicket.bind(this)
    }
    newTicket(ticket) {
        const customerID = this.props.customer._id
        this.props.newTicket({ticket, customerID})
 
    }
    deleteTicket(id) {
        console.log(id)
    }
    render() {
        const { customer } = this.props
        return (
            <div >
                
                <div >
                    <p>Customer Name: {customer.name}</p>
                    <p>Phone Number: {customer.phone} </p>
                    <p>Open Tickets: </p>

                    <Ticket customer={customer} allTickets={this.props.tickets} deleteTicket={this.deleteTicket} newTicket={this.newTicket}  />

                </div>

            </div>
        )
    }
}

export default styles(Customer)