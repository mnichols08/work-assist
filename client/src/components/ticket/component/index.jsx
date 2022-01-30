import React, { Component } from 'react'

import styles from './styles'

class Ticket extends Component {
    constructor(props) {
        super(props)
        this.state = { title: '', description: '', tickets: props.tickets, customerID: props.customer._id }
        this.postNewTicket = this.postNewTicket.bind(this)
        this.renderNewTicket = this.renderNewTicket.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    postNewTicket(e){
        e.preventDefault()
        e.stopPropagation()
        this.props.newTicket(this.state)
    }

    renderNewTicket(){
        
    }

    goToTicket(id){
        console.log('go to', id)
    }

    handleChange(e) {
        this.setState( { [e.target.name]: e.target.value })
    }
    render() {
        const { tickets } = this.state

           return (
            <ul><form onSubmit={this.postNewTicket}><input onChange={this.handleChange} placeholder="title" name="title" type="text"></input><br /><input onChange={this.handleChange} name="description" type="text" placeholder="description"></input></form><button onClick={this.postNewTicket}>Create New Ticket</button>
                {tickets.map(ticket => (
                    <li><a onClick={this.goToTicket}> {ticket.title} | {ticket.description} </a> | <a onClick={this.closeTicket}>x</a></li>
                ))}
            </ul>
        )
    }
}

export default styles(Ticket)