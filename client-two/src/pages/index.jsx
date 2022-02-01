import React, { Component } from "react";
import {
  withRouter
} from "react-router";

import "./index.css";

class IndexPage extends Component {
  constructor(props){
    super(props)
    this.state = { customer: {}}
    this.createCustomer = this.createCustomer.bind(this)
  }

  async createCustomer(input) {
    input.preventDefault()
    input.stopPropagation()
    const name = input.target.name.value
    const phone = input.target.phone.value
    const data = { name, phone }
    
    const customer = await this.props.createCustomer(data);
    this.props.history.push(`/customers/${customer.customer._id}`)
    this.props.setCustomerState(customer)
   

  }
  componentDidUpdata(){
    this.setState()
  }
  render() {
    return (
      <main className="index">
        <h1>Tick.it</h1>
        <p>
          Thank you for visiting my app! Please use at your own accord and let me know if you come across any bugs or have any suggestions. =)
        </p>
        <form onSubmit={this.createCustomer} id='customer'>
        <h2>
          Create Customer
        </h2>
        <div><label>Name </label><input name="name" type="text"/></div>
        <div><label>Phone: </label><input name="phone" type="number"/></div>
        <button type="submit">Create Customer</button>
        </form>
        <form onSubmit={this.createTicket} id='ticket'>
        <h2>
          Create Ticket
        </h2>
        <div><label>Title </label><input name="title" type="text"/></div>
        <div><label>Description: </label><input name="description" type="number"/></div>
        <div><label>Customer: </label><input name="customer" type="text"/></div>
        <button type="submit">Create Ticket</button>
        </form>
        <form onSubmit={this.props.createNote} id='note'>
        <h2>
          Create Note
        </h2>
        <div><label>Title </label><input name="noteTitle" type="text"/></div>
        <div><label>Description: </label><input name="noteDescription" type="number"/></div>
        <div><label>Ticket: </label><input name="ticket" type="text"/></div>
        <button type="submit">Create Note</button>
        </form>
        
      
      </main>
    );
  }
}

export default withRouter(IndexPage);
