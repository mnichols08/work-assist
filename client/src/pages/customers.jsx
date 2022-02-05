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
      customers: [],
      searchField: "",
      newCustomerField: false
    };
    this.createCustomer = this.createCustomer.bind(this);
    this.renderNewCustomerForm = this.renderNewCustomerForm.bind(this);
  }

  async createCustomer(input) {
    input.preventDefault();
    input.stopPropagation();
    const name = input.target.name.value;
    const phone = input.target.phone.value;
    const data = { name, phone };
    input.target.name.value = "";
    input.target.phone.value = "";

    const customer = await this.props.createCustomer(data)
    this.setState({ customers: [...this.state.customers, customer.customer], newCustomerField: false });
    this.props.history.push(`/customers/${customer.customer._id}`)

    //`)
    //this.setState({customers: [...this.state.customers, customer.customer], newCustomerField: false})
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
  componentDidUpdate() {
    if (this.state.searchField !== this.props.searchField)
      this.setState({ searchField: this.props.searchField });
  }
  renderNewCustomerForm() {
    this.setState({ newCustomerField: true });
  }
  render() {
    const { customers, searchField } = this.state;
    let filteredCustomers;
    if (this.state.customers > 3) this.setState({ newCustomerField: false });
    filteredCustomers = customers.sort((a, b) => (a.name > b.name) ? 1 : -1 )
    try {
      filteredCustomers = customers.filter((o) =>
        Object.keys(o).some((k) => {
          if (o[k] !== null)
            return o[k]
              .toString()
              .toLowerCase()
              .includes(searchField.toString().toLowerCase());
        })
      );
    } catch {
      console.log("fall back to lame search");
      filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchField.toLowerCase())
      );
    }
    return (
      <main className="customers">
        <h1>Customer Index</h1>
        {this.state.newCustomerField === true || this.state.customers.length < 2 ? (
          <form onSubmit={this.createCustomer} id="customer">
            <h2>Create Customer</h2>
            <div>
              <label>Name </label>
              <input autoFocus name="name" type="text" />
            </div>
            <div>
              <label>Phone: </label>
              <input name="phone" type="number" length="10" />
            </div>
            <button type="submit">Create Customer</button>
          </form>
        ) : (
          <button onClick={this.renderNewCustomerForm}>New Customer</button>
        )}
        {filteredCustomers.map((customer) => (
          <div className="customers" key={customer._id}>
            <Link to={`/customers/${customer._id}`} key={customer._id}>
              {customer.name}
            </Link>{" "}
            |
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
