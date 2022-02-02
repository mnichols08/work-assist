import React, { Component } from "react";
import { withRouter } from "react-router";

import "./index.css";

class IndexPage extends Component {
  constructor(props) {
    super(props);
  }

  async createCustomer(input) {
    input.preventDefault();
    input.stopPropagation();
    const name = input.target.name.value;
    const phone = input.target.phone.value;
    const data = { name, phone };

    const customer = await this.props.createCustomer(data);
    this.props.history.push(`/customers/${customer.customer._id}`);
  }
  render() {
    return (
      <main className="index">
        <h1>Tick.it</h1>
        <p>
          Thank you for visiting my buggy af little app! I hope you like it =)
        </p>
      </main>
    );
  }
}

export default withRouter(IndexPage);
