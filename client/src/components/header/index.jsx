import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { SearchBox } from "./search-box/search-box.component";
import AppNav from '../../components/app-nav'
import "./header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn: this.props.loggedIn}
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (e) => {
    this.props.setSearch(e.target.value);
  };

  render() {
    return (
      <header className="App-header">
        <div>
          <Link to="/" onClick={this.props.resetSearch}>
            <code>tick.it</code>
          </Link>
          {this.props.loggedIn ? <SearchBox
            placeholder={`Search ${this.props.getSearchFor}`}
            handleChange={this.handleChange}
            searchFor={this.props.getSearchFor}
          /> : null }
        </div>
        {this.props.loggedIn ? <AppNav setCustomers={this.props.setCustomers} setTickets={this.props.setCustomers} setNotes={this.props.setNotes}/> : <Link className="App-link login" to="/login">
            Login
          </Link>}
        
      </header>
    );
  }
}

export default Header;
