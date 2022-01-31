import React, { Component } from "react";

class TicketIndex extends Component {
    constructor(props){
        super(props)
        this.state = { tickets: this.props.tickets, deleteID: ''}
    }

    componentDidUpdate(){
        this.setState()
    }
  render() {
    return (
      <main className="index">
        <h1>Ticket Index</h1>
        <ul>
            {this.props.tickets.map(ticket => (
                 
                    <li key={ticket._id}>{ticket.title}</li>
                
            ))}
        </ul>
      </main>
    );
  }
}

export default TicketIndex;
