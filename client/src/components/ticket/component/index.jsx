import React, { Component } from 'react'

import styles from './styles'

class Ticket extends Component {
    constructor(props) {
        super(props)
        this.state = { title: '', description: '', allTickets: [], customerID: '' }
        this.postNewTicket = this.postNewTicket.bind(this)
        this.renderNewTicket = this.renderNewTicket.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    postNewTicket(){
        this.props.newTicket(this.state)
    }

    renderNewTicket(){
        
    }

    goToTicket(id){
   
    }

    handleChange(e) {
        this.setState( { [e.target.name]: e.target.value })
    }
    componentDidMount(){
        this.setState({allTickets: this.props.allTickets, customerID: this.props.customer._id})
    }
    render() {
        const { allTickets, customerID } = this.state

        
       const filteredTickets = allTickets.filter(ticket => ticket.origin === customerID)
       console.log(this.state.allTickets !== undefined)
           return (
            <ul><form onSubmit={this.postNewTicket}><input onChange={this.handleChange} placeholder="title" name="title" type="text"></input><br /><input onChange={this.handleChange} name="description" type="text" placeholder="description"></input></form><button onClick={this.postNewTicket}>Create New Ticket</button>
                {filteredTickets.map(ticket => (
                    <li><a onClick={this.goToTicket}> {ticket.title} | {ticket.description} </a> | <a onClick={this.goToTicket}>x</a></li>
                ))}
            </ul>
        )
    }
}

export default styles(Ticket)