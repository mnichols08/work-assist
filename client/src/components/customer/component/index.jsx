import React, { Component } from 'react'
import Ticket from "../../ticket"

import styles from './styles'

class Customer extends Component {
    constructor(props) {
        super(props)
       
    }
    render() {
        console.log(this.props)
        return (
            <div >
                
                <div >
                    <p>Customer Name: {this.props.customer.name}</p>
                    <p>Phone Number: {this.props.customer.phone} </p>
                    <p>Open Tickets: 
                        <ul>
                            {<Ticket customer={this.props.customer} allTickets={this.props.tickets}  />}
                        </ul>
                    </p>
                </div>

            </div>
        )
    }
}

export default styles(Customer)