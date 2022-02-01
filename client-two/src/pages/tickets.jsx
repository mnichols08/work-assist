import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

class TicketIndex extends Component {
    constructor(props){
        super(props)
        this.state = { tickets: this.props.tickets }
    }
    deleteTicket(id) {
        this.props.removeTicket(id);
        this.setState({
          tickets: this.state.tickets.filter((ticket) => ticket._id !== id),
        });
      }
    componentDidMount(){
            fetch("/tickets")
              .then((response) => response.json())
              .then((blob) => this.setState({ tickets: blob.data }));
          
    }
  render() {
    return (
      <main className="index">
        <h1>Ticket Index</h1>
        {this.state.tickets.map((ticket) => (
          <div className="tickets" key={ticket._id}>
            <Link
              onClick={() => this.props.getTicket(ticket._id)}
              to={`/tickets/${ticket._id}`}
              key={ticket._id}
            >
              {ticket.title}
            </Link> | 
            <Link
              to="#"
              onClick={() => this.deleteTicket(ticket._id)}
            >{` x `}</Link>
          </div>
        ))}
      </main>
    );
  }
}

export default TicketIndex;
