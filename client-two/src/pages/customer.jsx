import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
const CLIENT_API = null;
class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer:{name: 'loading...'},
      customerTickets: [],
      tickets: [],
      ticket: {}
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.newTicket = this.newTicket.bind(this);
  }

  handleDelete(id) {
    this.props.removeTicket(id);
    this.setState({
      customerTickets: this.state.customerTickets.filter(
        (ticket) => ticket._id !== id
      ),
    });
  }
  async newTicket(e) {
    e.stopPropagation();
    e.preventDefault();

    const title = { title: e.target.title.value };
    e.target.title.value = "";
    const customerID = this.state.customer._id;

    const t = await this.props.putTicket(title, customerID);
    const ticket = t.ticket;

    this.setState({
      customerTickets: [...this.state.customerTickets, ticket],
      ticket
    });
    this.props.history.push(`/tickets/${ticket._id}`);
  }
  componentDidMount() {
    fetch("/customers/" + this.props.match.params.id, {
      method: "GET",
      headers: {
        authkey: CLIENT_API,
      },
    })
      .then((response) => response.json())
      .then((blob) =>
        this.setState({
          customer: blob.customer,
          customerTickets: blob.customerTickets,
          tickets: blob,
        })
      );
  }
  componentDidUpdate() {
    this.setState();
  }
  render() {
    return (
      <div className="index" id={this.state.customer._id}>
        <h1>{this.state.customer.name}</h1>
        <p>Phone: {this.state.customer.phone}</p>
        <h2>Tickets</h2>
        <form onSubmit={this.newTicket}>
          <input type="text" name="title" placeholder="Enter Title" />
          <button type="submit">New Ticket</button>
        </form>

        <div className="tickets">
          {this.state.customerTickets.map((ticket) => (
            <div key={ticket._id} className="ticket">
              <Link to={`/tickets/${ticket._id}`}>{ticket.title}</Link>
              <button
                type="submit"
                onClick={() => this.handleDelete(ticket._id)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Customer;
