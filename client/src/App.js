import React, { Component } from "react";
import { initializeApp } from "firebase/app"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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

const firebaseConfig = {
  apiKey: "AIzaSyCco2Fb-0VuVDQBs8qrzY84TItKQEh9GoA",
  authDomain: "work-assist-338900.firebaseapp.com",
  projectId: "work-assist-338900",
  storageBucket: "work-assist-338900.appspot.com",
  messagingSenderId: "766626669832",
  appId: "1:766626669832:web:a9efb820c08a293272f8bd"
};


const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const app = initializeApp(firebaseConfig);
const auth = getAuth();
auth.languageCode = 'it';

signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

const CLIENT_API = process.env.CLIENT_API || null;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {},
      customers: [],
      customerTickets: [],
      ticket: {},
      ticketNotes: [],
      note: {},
      customers: [],
      tickets: [],
      notes: [],
      searchFor: "",
      searchField: "",
      app
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
    this.updateTicket = this.updateTicket.bind(this);
    this.updateTicketOrigin = this.updateTicketOrigin.bind(this);
    this.removeTicket = this.removeTicket.bind(this);
    this.setNotes = this.setNotes.bind(this);
    this.getNotes = this.getNotes.bind(this);
    this.getNote = this.getNote.bind(this);
    this.putNote = this.putNote.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.updateNote = this.updateNote.bind(this)
  }
  resetSearch() {
    this.setState({ searchFor: "" });
  }
  setSearch(searchField) {
    this.setState({ searchField });
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
  async getCustomer(id) {
    await fetch("/customers/" + id, {
      method: "GET",
      headers: {
        authkey: CLIENT_API,
      },
    })
      .then((response) => response.json())
      .then((blob) =>
        this.setState({
          customer: blob.customer,
          customerTickets: blob.customerTickets,
        })
      );
    return this.state.customer;
  }
  setCustomerID(id) {
    this.setState({ customer: { _id: id } });
  }
  async putCustomer(newCustomer) {
    const newState = await fetch("/customers/", {
      headers: {
        authkey: CLIENT_API,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(newCustomer),
    })
      .then((response) => response.json())
      .then((blob) => {
        return { customers: blob.customers, customer: blob.customer };
      });
    //this.setState(newState)
    return newState;
  }
  // setCustomerState(customer){
  //   if (customer && this.state.customers.length > 0)
  //    this.setState({customers: [...this.state.customer, customer]})

  // }
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
  async updateCustomer(newCustomer, id) {
    const newState = await fetch("/customers/" + id, {
      method: "PATCH",
      headers: {
        authkey: CLIENT_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    })
      .then((response) => response.json())
      .then((blob) => {
        return { customer: blob.data };
      });
    return newState;
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
    const plusId = id.length > 0 ? `/${id}` : null
    const ticket = await fetch("/tickets" + plusId, {
      method: "PATCH",
      headers: {
        authkey: CLIENT_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTicket),
    })
      .then((response) => response.json())
      .then((blob) => blob.ticket)
      ;

    this.setState( ticket );

    return ticket;
  }
  async updateTicketOrigin(ticketID, customerID) {
    if (customerID !== 'Assign Customer' || customerID !== null || customerID !== '') {
      const newState = await fetch(`/tickets/${ticketID}/${customerID}`, {
        method: "PATCH",
        headers: {
          authkey: CLIENT_API,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((blob) => {
          return {customers: blob.customers, tickets: blob.tickets, ticket: blob.ticket, customer: blob.customer};
        });
        this.setState({ticket: newState.ticket, tickets: newState.tickets, customers: newState.customers })
        console.log(newState)
        return newState
      }
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
        return {
          customer: blob.customer,
          customerTickets: blob.customerTickets,
          tickets: blob.tickets,
        };
      });
    this.setState(newState);
  }
  async putTicket(newTicket, customerID) {
    const newState = await fetch("/tickets/" + customerID, {
      headers: {
        authkey: CLIENT_API,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(newTicket),
    })
      .then((response) => response.json())
      .then((blob) => {
        return {
          customer: blob.customer,
          customerTickets: blob.customerTickets,
          tickets: blob.tickets,
          ticket: blob.ticket,
          customers: blob.customers
        };
      });
      console.log(newState)
    this.setState({customers: newState.customers, customerTickets: newState.customerTickets})
    
    return newState;
  }
  pushTicketToState(ticket) {
    this.setState({ tickets: [...this.state.tickets, ticket] });
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
    }).then((response) => response.json());
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
      .then((blob) => blob);
      
    return createNote;
  }

  async updateNote(newNote, id) {
    console.log(newNote, id)
    const plusId = id.length > 0 ? `/${id}` : null
    const note = await fetch("/notes" + plusId, {
      method: "PATCH",
      headers: {
        authkey: CLIENT_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((blob) => blob)
      ;
    this.setState( {note: note.note, notes: note.notes, ticketNotes: note.ticketNotes} );
      return {note: note.note, notes: note.notes, ticketNotes: note.ticketNotes};
  }

  componentDidMount() {
    fetch("/open")
      .then((response) => response.json())
      .then((blob) =>
        this.setState({
          customers: blob.state.customers,
          tickets: blob.state.tickets,
          notes: blob.state.notes,
        })
      );
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
            resetSearch={this.resetSearch}
            getSearchFor={this.state.searchFor}
            setSearch={this.setSearch}
          />
          <Switch>
            <Route
              exact
              path="/"
              children={<IndexPage createCustomer={this.putCustomer} />}
            />
            <Route
              exact
              path="/customers"
              render={(routeProps) => (
                <CustomerIndex
                  {...routeProps}
                  createCustomer={this.putCustomer}
                  getCustomer={this.getCustomer}
                  removeCustomer={this.removeCustomer}
                  searchField={this.state.searchField}
                />
              )}
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
                  saveCustomer={this.updateCustomer}
                />
              )}
            />
            <Route
              exact
              path="/tickets"
              render={(routeProps) => (
                <TicketIndex
                  {...routeProps}
                  removeTicket={this.removeTicket}
                  getTicket={this.getTicket}
                  searchField={this.state.searchField}
                  customers={this.state.customers}
                  createTicket={this.putTicket}
                />
              )}
            />
            <Route
              path="/tickets/:id"
              render={(routeProps) => (
                <Ticket
                  updateOrigin={this.updateTicketOrigin}
                  customer={this.getCustomer}
                  customers={this.state.customers}
                  removeTicket={this.removeTicket}
                  ticket={this.state.ticket}
                  tickets={this.state.tickets}
                  {...routeProps}
                  ticketNotes={this.state.ticketNotes}
                  removeNote={this.removeNote}
                  putNote={this.putNote}
                  saveTicket={this.updateTicket}
                  updateNote={this.updateNote}
                />
              )}
            />
            <Route
              exact
              path="/notes"
              render={(routeProps) => (
                <NoteIndex
                  {...routeProps}
                  createNote={this.putNote}
                  tickets={this.state.tickets}
                  getTicket={this.getTicket}
                  removeNote={this.removeNote}
                  searchField={this.state.searchField}
                />
              )}
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
