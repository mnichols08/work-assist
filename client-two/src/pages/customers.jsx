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
    this.state = {
      customers: this.props.customers
    };
  }
  deleteCustomer(id) {
    this.props.removeCustomer(id);
    this.setState({
      customers: this.state.customers.filter((customer) => customer._id !== id),
    });
  }
  componentDidMount() {
    fetch("/customers")
      .then((response) => response.json())
      .then((blob) => this.setState({ customers: blob.data }));
  }
  render() {
    return (
      <main className="customers">
        <h1>Customer Index</h1>
        {this.state.customers.map((customer) => (
          <div className="customers" key={customer._id}>
            <Link
              onClick={() => this.props.getCustomer(customer._id)}
              to={`/customers/${customer._id}`}
              key={customer._id}
            >
              {customer.name}
            </Link> | 
            <Link
              to="#"
              onClick={() => this.deleteCustomer(customer._id)}
            >{` x `}</Link>
          </div>
        ))}
      </main>
    );
  }
}

export default CustomerIndex;
