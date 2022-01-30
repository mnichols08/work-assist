import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import Header from "./page/header";
import Footer from './page/footer'
import IndexPage from "./pages/index";
import CustomerIndex from "./pages/customers";
import TicketIndex from "./pages/tickets";
import NoteIndex from "./pages/notes";
import "./App.css";

const CLIENT_API = process.env.CLIENT_API || null;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {},
      ticket: {},
      note: {},
      customers: [],
      tickets: [],
      notes: [],
      searchFor: '',
      filteredCustomers: [],
      filteredTickets: [],
      filteredNotes: []
    };
    this.goHome = this.goHome.bind(this);
    this.fetchState = this.fetchState.bind(this);
    this.setCustomers = this.setCustomers.bind(this);
    this.getCustomers = this.getCustomers.bind(this);
    this.getCustomer = this.getCustomer.bind(this);
    this.putCustomer = this.putCustomer.bind(this);
    this.setTickets = this.setTickets.bind(this);
    this.getTickets = this.getTickets.bind(this);
    this.getTicket = this.getTicket.bind(this);
    this.putTicket = this.putTicket.bind(this);
    this.setNotes = this.setNotes.bind(this);
    this.getNotes = this.getNotes.bind(this);
    this.getNote = this.getNote.bind(this);
    this.putNote = this.putNote.bind(this);
    this.setSearch = this.setSearch.bind(this)
  }
  goHome() {
    this.fetchState();
  }
  setSearch(searchField) {
    try {
    const filteredCustomers = this.state.customers.filter(o => Object.keys(o).some(k => o[k].toString().toLowerCase().includes(searchField.toString().toLowerCase())));
    const filteredTickets = this.state.tickets.filter(o => Object.keys(o).some(k => o[k].toString().toLowerCase().includes(searchField.toString().toLowerCase())));
    const filteredNotes = this.state.notes.filter(o => Object.keys(o).some(k => new String(o[k]).toLowerCase().includes(searchField.toString().toLowerCase())));
    this.setState({filteredCustomers, filteredTickets, filteredNotes})
    } catch {
    }
  }
  fetchState() {
    fetch("/open", {
      method: "GET",
      headers: {
        authkey: CLIENT_API,
      },
    })
      .then((response) => response.json())
      .then((blob) =>
        this.setState({
          customers: blob.state.customers,
          tickets: blob.state.tickets,
          notes: blob.state.notes,
          filteredCustomers: blob.state.customers,
          filteredTickets: blob.state.tickets,
          filteredNotes: blob.state.notes
        })
      );
  }
  setCustomers() {
    this.setState({ searchFor: 'customers'})
  }
  getCustomers() {
    fetch("/customers", {
      method: "GET",
      headers: {
        authkey: CLIENT_API,
      },
    })
      .then((response) => response.json())
      .then((blob) => this.setState({ customers: blob.data }));
  }
  getCustomer(id) {
    fetch("/customers/" + id, {
      method: "GET",
      headers: {
        authkey: CLIENT_API,
      },
    })
      .then((response) => response.json())
      .then((blob) => this.setState({ customer: blob.data }));
  }
  putCustomer(newCustomer) {
    fetch("/customers/", {
      method: "POST",
      headers: {
        authkey: CLIENT_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    })
      .then((response) => response.json())
      .then((blob) => this.setState({ tickets: blob.data }));
  }
  setTickets() {
    this.setState({searchFor: 'tickets'})
  }
  getTickets() {
    fetch("/tickets", {
      method: "GET",
      headers: {
        authkey: CLIENT_API,
      },
    })
      .then((response) => response.json())
      .then((blob) => this.setState({ tickets: blob.data }));
  }
  getTicket(id) {
    fetch("/tickets/" + id, {
      method: "GET",
      headers: {
        authkey: CLIENT_API,
      },
    })
      .then((response) => response.json())
      .then((blob) => this.setState({ ticket: blob.data }));
  }
  putTicket(newTicket) {
    fetch("/tickets/" + newTicket.customerID, {
      method: "POST",
      headers: {
        authkey: CLIENT_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTicket.ticket),
    })
      .then((response) => response.json())
      .then((blob) => this.setState({ tickets: blob.data }));
  }
  setNotes() {
    this.setState({ searchFor: 'notes'})
  }
  getNotes() {
    fetch("/notes", {
      method: "GET",
      headers: {
        authkey: CLIENT_API,
      },
    })
      .then((response) => response.json())
      .then((blob) => this.setState({ notes: blob.data }));
  }
  getNote(id) {
    fetch("/notes/" + id, {
      method: "GET",
      headers: {
        authkey: CLIENT_API,
      },
    })
      .then((response) => response.json())
      .then((blob) => this.setState({ note: blob.data }));
  }
  putNote(newNote) {
    fetch("/notes/" + newNote.ticketID, {
      method: "POST",
      headers: {
        authkey: CLIENT_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote.note),
    })
      .then((response) => response.json())
      .then((blob) => this.setState({ tickets: blob.data }));
  }
  componentDidMount() {
    this.fetchState();
  }
  render() {
    console.log(this.state);
    return (
      <Router>
        <div className="App">
          <Header
            goHome={this.goHome}
            setCustomers={this.setCustomers}
            setTickets={this.setTickets}
            setNotes={this.setNotes}
            getSearchFor={this.state.searchFor}
            setSearch={this.setSearch}
          />
          <Switch>
            <Route exact path="/" children={<IndexPage data={this.state}/> } />
            <Route exact path="/customers" children={<CustomerIndex customers={this.state.filteredCustomers} />} />
            <Route exact path="/tickets" children={<TicketIndex tickets={this.state.filteredTickets}   />} />
            <Route exact path="/notes" children={<NoteIndex notes={this.state.filteredNotes} />}  />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
