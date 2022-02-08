import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

class AppNav extends Component {
  render() {
    return (
      <nav>
        <Link
          onClick={this.props.setCustomers}
          to="/customers"
          className="App-link"
        >
          Customers
        </Link>{" "}
        <Link
          onClick={this.props.setTickets}
          to="/tickets"
          className="App-link"
        >
          Tickets
        </Link>{" "}
        <Link onClick={this.props.setNotes} to="/notes" className="App-link">
          Notes
        </Link>
      </nav>
    );
  }
}

export default AppNav;
