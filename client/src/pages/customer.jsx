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
      customer: { name: "loading..." },
      customerTickets: [],
      tickets: [],
      ticket: {},
      showEditField: { name: false, phone: false }
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.newTicket = this.newTicket.bind(this);
    this.showNameEdit = this.showNameEdit.bind(this);
    this.showPhoneEdit = this.showPhoneEdit.bind(this);
    this.saveCustomer = this.saveCustomer.bind(this);
  }
  showPhoneEdit() {
    this.setState({ showEditField: { phone: true } });
  }
  showNameEdit() {
    this.setState({ showEditField: {name: true }});
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
      ticket,
    });
    this.props.history.push(`/tickets/${ticket._id}`);
  }
  async saveCustomer(input){
    input.stopPropagation()
    input.preventDefault()
    let customer
    if (input.target.name){
    customer = await this.props.saveCustomer({name: input.target.name.value}, this.state.customer._id)
    this.setState({ customer: customer.customer, showEditField: {name: false}} );
  }
    else if (input.target.phone) {
     customer =  await this.props.saveCustomer({phone: input.target.phone.value}, this.state.customer._id)
      this.setState({  customer: customer.customer, showEditField: {phone: false}});
    }
    
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
        {this.state.showEditField.name === true ||
        this.state.customer.name === undefined ? (
          <h1><form onSubmit={this.saveCustomer}>
            <input type="text" name="name" defaultValue={this.state.customer.name} placeholder={this.state.customer.name || 'Customer Name'} /><button type="submit">Save</button>
          </form>
          </h1>
        ) : (
          <h1>
            {this.state.customer.name}{" "}
            <Link
              to={`/customers/${this.state.customer._id}`}
              onClick={this.showNameEdit}
            >
              {" "}
              /{" "}
            </Link>
          </h1>
        )}
        {this.state.showEditField.phone === true || this.state.customer.phone == undefined ? (
          <form onSubmit={this.saveCustomer}><input onSubmit={this.saveCustomer} type="number" name="phone" defaultValue={this.state.customer.phone} placeholder={this.state.customer.phone || 'Phone Number'} /><button type="submit">Save</button></form>
        ) : (
          <p>Phone: {this.state.customer.phone}<Link
          to={`/customers/${this.state.customer._id}`}
          onClick={this.showPhoneEdit}
        >
          {" "}
          /{" "}
        </Link></p>
        )}
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
