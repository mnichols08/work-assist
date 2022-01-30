import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

class CustomerIndex extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(id){
    this.props.getCustomer(id)
  }
  render() {
    return (
      <main className="customers">
        <h1>Customer Index</h1>
        {this.props.customers.map((customer) => (
          <div className="customers" key={`div${customer._id}`}>
            <Link
              
              to={`/customers/${customer._id}`}
              key={customer._id}
            >
              {customer.name}
            </Link>
            <Link to="#" onClick={this.props.removeCustomer}>{` x `}</Link>
          </div>
        ))}
      </main>
    );
  }
}

export default CustomerIndex;
