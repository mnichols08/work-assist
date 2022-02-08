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
    this.state = {loggedIn: false}
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
          <SearchBox
            placeholder={`Search ${this.props.getSearchFor}`}
            handleChange={this.handleChange}
            searchFor={this.props.getSearchFor}
          />
        </div>
        {this.state.LoggedIn ? <AppNav setCustomers={this.props.setCustomers} setTickets={this.props.setCustomers} setNotes={this.props.setNotes}/> : 'logiin'}
        
      </header>
    );
  }
}

export default Header;
