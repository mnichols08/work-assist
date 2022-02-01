import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import Header from "./page/header";
import Footer from "./page/footer";
import IndexPage from "./pages/index";
import CustomerIndex from "./pages/customers";
import Customer from "./pages/customer";
import TicketIndex from "./pages/tickets";
import Ticket from "./pages/ticket";
import NoteIndex from "./pages/notes";
import "./App.css";

const CLIENT_API = process.env.CLIENT_API || null;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {},
      customerTickets: [],
      ticket: {},
      ticketNotes: [],
      note: {},
      customers: [],
      tickets: [],
      notes: [],
      searchFor: "",
      filteredCustomers: [],
      filteredTickets: [],
      filteredNotes: [],
    };

    this.setCustomerID = this.setCustomerID.bind(this);
    this.setCustomers = this.setCustomers.bind(this);
    this.getCustomers = this.getCustomers.bind(this);
    this.getCustomer = this.getCustomer.bind(this);
    this.putCustomer = this.putCustomer.bind(this);
    this.removeCustomer = this.removeCustomer.bind(this);
    this.setTickets = this.setTickets.bind(this);
    this.getTickets = this.getTickets.bind(this);
    this.getTicket = this.getTicket.bind(this);
    this.putTicket = this.putTicket.bind(this);
    this.removeTicket = this.removeTicket.bind(this);
    this.setNotes = this.setNotes.bind(this);
    this.getNotes = this.getNotes.bind(this);
    this.getNote = this.getNote.bind(this);
    this.putNote = this.putNote.bind(this);
    this.setSearch = this.setSearch.bind(this);
  }
  setSearch(searchField) {
    if (searchField.length === 0) this.setState({filteredCustomers: this.state.customers, filteredTickets: this.state.tickets, filteredNotes: this.state.notes})
    try {
      const filteredCustomers = this.state.customers.filter((o) =>
        Object.keys(o).some((k) =>
          o[k]
            .toString()
            .toLowerCase()
            .includes(searchField.toString().toLowerCase())
        )
      );
      const filteredTickets = this.state.tickets.filter((o) =>
        Object.keys(o).some((k) =>
          o[k]
            .toString()
            .toLowerCase()
            .includes(searchField.toString().toLowerCase())
        )
      );
      const filteredNotes = this.state.notes.filter((o) =>
        Object.keys(o).some((k) =>
          new String(o[k])
            .toLowerCase()
            .includes(searchField.toString().toLowerCase())
        )
      );
      this.setState({ filteredCustomers, filteredTickets, filteredNotes });
    } catch {}
  }

  setCustomers() {
    this.setState({ searchFor: "customers" });
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
      .then((blob) => this.setState({ customer: blob.customer, customerTickets: blob.customerTickets }));
  }
  setCustomerID(id) {
    this.setState({ customer: { _id: id } });
  }
  async putCustomer(newCustomer) {
    console.log(newCustomer)
    const newState = await fetch("/customers/", {
      headers: {
        authkey: CLIENT_API,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(newCustomer),
    }).then((response) => response.json())
      .then((blob) => { 
        return {customers: blob.customers, customer: blob.customer }});
        this.setState(newState)
        return newState
        
  }
  setCustomerState(customer){
    if (customer && this.state.customers.length > 0)
     this.setState({customers: [...this.state.customer, customer]})
    
  }
  removeCustomer(id) {
    fetch("/customers/" + id, {
      method: "DELETE",
      headers: {
        authkey: CLIENT_API,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((blob) =>
        this.setState({ tickets: blob.tickets, customers: blob.data })
      );
  }
  setTickets() {
    this.setState({ searchFor: "tickets" });
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
      .then((blob) => blob.data);
  }
  async updateTicket(newTicket, id) {
    const newState = await fetch("/tickets/" + id, {
      method: "patch",
      headers: {
        authkey: CLIENT_API,
      },
      body: JSON.stringify(newTicket)
    })
      .then((response) => response.json())
      .then((blob) => {
        return { ticket: blob.ticket }
      }
        
      );
      return newState
  }
  async removeTicket(id) {
    const newState = await fetch("/tickets/" + id, {
      method: "DELETE",
      headers: {
        authkey: CLIENT_API,
      },
    })
      .then((response) => response.json())
      .then((blob) => {
        return { customer: blob.customer, customerTickets: blob.customerTickets }
      }
        
      );
      this.setState(newState)
  }
  async putTicket(newTicket, customerID) {
    const newState = await fetch("/tickets/" + customerID, {
      headers: {
        authkey: CLIENT_API,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(newTicket),
    }).then((response) => response.json())
      .then((blob) => { 
        return {customer: blob.customer, customerTickets: blob.customerTickets, tickets: blob.tickets, ticket: blob.ticket }});
        this.setState(newState)
        return newState
  }
  pushTicketToState(ticket){
    this.setState({tickets: [...this.state.tickets, ticket]})
  }
  setNotes() {
    this.setState({ searchFor: "notes" });
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
  removeNote(id) {
    fetch("/notes/" + id, {
      method: "DELETE",
      headers: {
        authkey: CLIENT_API,
      },
    })
      .then((response) => response.json())
  }
  async putNote(newNote, ticketID) {
   const createNote = await fetch("/notes/" + ticketID, {
      method: "POST",
      headers: {
        authkey: CLIENT_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((blob) => blob );
      return createNote
  }

  render() {
    console.log(this.state)
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
            <Route
              exact
              path="/"
              children={
                <IndexPage
                  createCustomer={this.putCustomer}
                  data={this.state}
                  setCustomerState={this.setCustomerState}
                />
              }
            />
            <Route
              exact
              path="/customers"
              children={
                <CustomerIndex
                  getCustomer={this.getCustomer}
                  removeCustomer={this.removeCustomer}
                  customers={this.state.filteredCustomers}
                />
              }
            />
            <Route
              path="/customers/:id"
              render={(routeProps) => (
                <Customer
                  {...routeProps}
                  tickets={this.state.tickets}
                  customer={this.state.customer}
                  customerTickets={this.state.customerTickets}
                  getCustomer={this.getCustomer}
                  removeTicket={this.removeTicket}
                  putTicket={this.putTicket}
                  ticket={this.state.ticket}
                  pushTicketToState={this.pushTicketToState}
                />
              )}
            />
            <Route
              exact
              path="/tickets"
              children={<TicketIndex removeTicket={this.removeTicket} getTicket={this.getTicket} tickets={this.state.filteredTickets} />}
            />
            <Route
              path="/tickets/:id"
              render={routeProps => ( 
              <Ticket 
              ticket={this.state.ticket }
              tickets={this.state.tickets}
              {...routeProps} 
              ticketNotes={this.state.ticketNotes}
              removeNote={this.removeNote}
              putNote={this.putNote}
              updateTicket={this.updateTicket}
              />
              )}
            />
            <Route
              exact
              path="/notes"
              children={<NoteIndex getTicket={this.getTicket} removeNote={this.removeNote} notes={this.state.filteredNotes} />}
            />
            <Route
              path="/customers/:id"
              children={<Customer note={this.state.note} />}
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
