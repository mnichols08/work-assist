import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

class TicketIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { tickets: [], searchField: "", showNewField: false };
    this.showNewField = this.showNewField.bind(this);
    this.createTicket = this.createTicket.bind(this);
  }
  showNewField() {
    this.setState({ showNewField: true });
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
    input.target.customer.value = "New Customer";

    if (
      customer === "New Customer" ||
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
    fetch("/tickets")
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
        {this.state.showNewField == true || this.state.tickets.length < 2 ? (
          <form onSubmit={this.createTicket} className="createNote">
            <h4>Create Ticket</h4>
            <div>
              <label>Title </label>
              <input name="title" type="text" />
            </div>
            <div>
              <label>Description: </label>
              <input name="description" type="text" />
            </div>
            <div>
              <label>Customer:</label>
              <select name="customer" defaultValue="New Customer">
                <option key="placeholder" disabled>
                  New Customer
                </option>
                {this.props.customers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Submit</button>{" "}
          </form>
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
