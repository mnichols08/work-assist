import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import CreateTicket from '../components/create-ticket'
const CLIENT_API = process.env.REACT_APP_CLIENT_API
class TicketIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { tickets: [], searchField: "", showEditField: {new: false} };
    this.showNewField = this.showNewField.bind(this);
    this.createTicket = this.createTicket.bind(this);
  }
  showNewField() {
    this.setState({ showEditField: {new: true} });
  }
  async createTicket(input) {
    input.preventDefault();
    input.stopPropagation();
    const newTicket = {
      title: input.target.title.value,
      description: input.target.description.value,
    };
    let customer = input.target.customer.value;

    input.target.title.value = "";
    input.target.description.value = "";
    input.target.customer.value = "No Customer";

    if (
      customer === "No Customer" ||
      !customer ||
      customer === null ||
      customer == undefined
    ) {
      customer = "";
    }
    const t = await this.props.createTicket(newTicket, customer);
    const ticket = t.ticket;
    this.setState({ tickets: [...this.state.tickets, ticket] });
   this.props.history.push(`/tickets/${ticket._id}`)
  }
  deleteTicket(id) {
    this.props.removeTicket(id);
    this.setState({
      tickets: this.state.tickets.filter((ticket) => ticket._id !== id),
    });
  }
 
  componentDidMount() {
    fetch("/tickets", {
      headers: {
        authkey: CLIENT_API,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((blob) => this.setState({ tickets: blob.data }));
  }
  componentDidUpdate() {
    if (this.state.searchField !== this.props.searchField)
      this.setState({ searchField: this.props.searchField });
  }
  render() {
    const { tickets, searchField } = this.state;
    let filteredTickets;
    try {
      filteredTickets = tickets.filter((o) =>
        Object.keys(o).some((k) =>
          o[k] !== null
            ? o[k]
                .toString()
                .toLowerCase()
                .includes(searchField.toString().toLowerCase())
            : o[k].includes(searchField)
        )
      );
    } catch {
      try {
        console.log("fall back to lame search");
        filteredTickets = tickets.filter((note) =>
          note.title.toLowerCase().includes(searchField.toLowerCase())
        );
      } catch {
        filteredTickets = tickets
      }
    }
    return (
      <main className="index">
        <h1>Ticket Index</h1>
        {this.state.showEditField.new == true || this.state.tickets.length < 2 ? (
          <CreateTicket createTicket={this.createTicket} customers={this.props.customers}/>
        ) : (
          <button onClick={this.showNewField}>New Ticket</button>
        )}
        {filteredTickets.map((ticket) => (
          <div className="tickets" key={ticket._id}>
            <Link
              onClick={() => this.props.getTicket(ticket._id)}
              to={`/tickets/${ticket._id}`}
              key={ticket._id}
            >
              {ticket.title}
            </Link>{" "}
            |
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
