import React, { Component } from "react";

class CreateTicket extends Component {
  render() {
    return (
      <form onSubmit={this.props.createTicket} className="createNote">
        <h4>Create Ticket</h4>
        <div>
          <label>Title </label>
          <input autoFocus name="title" type="text" />
        </div>
        <div>
          <label>Description: </label>
          <input name="description" type="text" />
        </div>
        <div>
          <label>Customer:</label>
          <select name="customer" defaultValue="No Customer">
            <option key="placeholder" disabled>
              No Customer
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
    );
  }
}

export default CreateTicket