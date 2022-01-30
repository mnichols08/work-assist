import React, { Component } from "react";

class TicketIndex extends Component {
    constructor(props){
        super(props)
        this.state = { deleteID: ''}
    }


  render() {
    return (
      <main className="index">
        <p>Ticket Index</p>
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
