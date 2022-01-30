import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Ticket from "./components/ticket/component";
import Customer from "./components/customer/component";
import MonoTicket from "./components/ticket/mono";
import TicketIndex from "./components/ticket";
import CustomerIndex from "./components/customer";
import seed from "./components/ticket/seed";
import NewTicketForm from "./components/ticket/new";
import NewCustomerForm from "./components/customer/new";
import { generateTicket } from "./components/ticket/helper";

import Page from "./components/page";

const CLIENT_API = process.env.REACT_APP_CLIENT_API;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: [], customer: {}, tickets: [], notes: [] };
    this.saveTicket = this.saveTicket.bind(this);
    this.saveCustomer = this.saveCustomer.bind(this);
    this.findTicket = this.findTicket.bind(this);
    this.findCustomer = this.findCustomer.bind(this);
    this.deleteTicket = this.deleteTicket.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
  }
  findCustomer(id) {
    fetch("/customers/" + id, {
      method: "GET",
      headers: {
        authkey: CLIENT_API,
      },
    })
      .then((response) => response.json())
      .then((blob) => this.setState({ customer: blob.data }));
    console.log(this.state);
  }
  findTicket(id) {
    return this.state.tickets.find(function (ticket) {
      return ticket.id === id;
    });
  }
  deleteTicket(id) {
    this.setState(
      (st) => ({ tickets: st.tickets.filter((ticket) => ticket.id !== id) }),
      this.syncLocalStorage
    );
  }
  deleteCustomer(id) {
    const path = `/customers/${id}`;
    fetch(path, {
      method: "DELETE",
      headers: {
        authkey: CLIENT_API,
      },
    })
      .then((response) => response.json())
      .then((blob) => this.setState({ customers: blob.data }));
  }
  saveCustomer(newCustomer) {
    fetch("/customers", {
      method: "POST",
      headers: {
        authkey: CLIENT_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    })
      .then((response) => response.json())
      .then((blob) => this.setState({ customers: blob.data }));
  }
  saveTicket(newTicket) {
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
  syncLocalStorage() {
    window.localStorage.setItem(
      "customers",
      JSON.stringify(this.state.customers)
    );
    window.localStorage.setItem("tickets", JSON.stringify(this.state.tickets));
    window.localStorage.setItem("notes", JSON.stringify(this.state.notes));
  }
  componentDidMount() {
    fetch("/customers", {
      method: "GET",
      headers: {
        authkey: CLIENT_API,
      },
    })
      .then((response) => response.json())
      .then((blob) => this.setState({ customers: blob.data }));

    fetch("/tickets", {
      method: "GET",
      headers: {
        authkey: CLIENT_API,
      },
    })
      .then((response) => response.json())
      .then((blob) => this.setState({ tickets: blob.data }));

    fetch("/notes", {
      method: "GET",
      headers: {
        authkey: CLIENT_API,
      },
    })
      .then((response) => response.json())
      .then((blob) => this.setState({ notes: blob.data }));
  }

  render() {
    return (
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="page" timeout={500}>
              <Switch location={location}>
                <Route
                  exact
                  path="/ticket/new"
                  render={(routeProps) => (
                    <Page>
                      <NewTicketForm
                        saveTicket={this.saveTicket}
                        tickets={this.state.tickets}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/ticket/:ticketId/:colorId"
                  render={(routeProps) => (
                    <Page>
                      <MonoTicket
                        colorId={routeProps.match.params.colorId}
                        ticket={generateTicket(
                          this.findTicket(routeProps.match.params.ticketId)
                        )}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/ticket/:id"
                  render={(routeProps) => (
                    <Page>
                      <Ticket
                        ticket={generateTicket(
                          this.findTicket(routeProps.match.params.id)
                        )}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/customer/new"
                  render={(routeProps) => (
                    <Page>
                      <NewCustomerForm
                        saveCustomer={this.saveCustomer}
                        tickets={this.state.tickets}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={(routeProps) => (
                    <Page>
                      <TicketIndex
                        tickets={this.state.tickets}
                        {...routeProps}
                        deleteTicket={this.deleteTicket}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/customer/:id"
                  render={(routeProps) => (
                    <Page>
                      <Customer
                        {...routeProps}
                        tickets={this.state.tickets}
                        customer={this.state.customer}
                        customers={this.state.customers}
                        findCustomer={this.findCustomer}
                        newTicket={this.saveTicket}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/customer"
                  render={(routeProps) => (
                    <Page>
                      <CustomerIndex
                        deleteCustomer={this.deleteCustomer}
                        customers={this.state.customers}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}

export default App;
