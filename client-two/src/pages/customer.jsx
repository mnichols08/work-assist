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
    this.state = { customer: {}, tickets: {}, deleteID: '' };
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    if ((this.customer = {})) this.props.getCustomer(this.props.match.params.id);
    fetch("/customers/" + this.props.match.params.id, {
      method: "GET",
      headers: {
        authkey: CLIENT_API,
      },
    })
      .then((response) => response.json())
      .then((blob) =>
        this.setState({ tickets: blob.tickets, customer: blob.data })
      );
  }
  handleDelete(e) {
      e.stopPropagation()

      console.log(this.props.id)

  }
  render() {
    let filteredTickets;
    try {
      filteredTickets = this.state.tickets.filter(
        (ticket) => ticket.origin === this.state.customer._id
      );
    } catch {
      filteredTickets = this.state.customer.tickets;
    }
    return (
      <div className="index" id={this.state.customer._id}>
        <h1>{this.state.customer.name}</h1>
        <p>Phone: {this.state.customer.phone}</p>
        <h2>Tickets</h2>
        <ul className="tickets">
          {filteredTickets
            ? filteredTickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="ticket"
                >
                  <Link to={`/tickets/${ticket._id}`}>
                    {ticket.title}
                  </Link>
                  <Link
                    to={`#`}
                    id={ticket._id}
                    onClick={this.handleDelete}
                  >{` x `}</Link>
                </div>
              ))
            : null}
        </ul>
      </div>
    );
  }
}

export default Customer;
