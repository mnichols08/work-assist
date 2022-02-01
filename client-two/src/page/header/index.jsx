import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { SearchBox } from "./search-box/search-box.component";
import "./header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (e) => {
    this.props.setSearch(e.target.value);
  };
  render() {
    return (
      <header className="App-header">
        <div>
          <Link to="/">
            <code>tick.it</code>
          </Link>
          <SearchBox
            placeholder={`Search ${this.props.getSearchFor}`}
            handleChange={this.handleChange}
            searchFor={this.props.getSearchFor}
          />
        </div>
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
      </header>
    );
  }
}

export default Header;
