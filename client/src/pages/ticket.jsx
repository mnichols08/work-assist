import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import "./ticket.css";

import TicketsPage from '../components/tickets-page'
import AssignCustomer from '../components/assign-customer'
import SaveTicket from '../components/save-ticket'
const CLIENT_API = process.env.REACT_APP_CLIENT_API || null;
class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: this.props.customers || [],
      ticket: { title: "loading...", id: "" },
      ticketNotes: [],
      ticketCustomer: {},
      noteID: '',
      showEditField: { title: false, description: false, note: false, assignCustomer: false }

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveTicket = this.saveTicket.bind(this);
    this.showDescEdit = this.showDescEdit.bind(this);
    this.showTitleEdit = this.showTitleEdit.bind(this);
    this.cancelTitle = this.cancelTitle.bind(this);
    this.cancelDesc = this.cancelDesc.bind(this);
    this.showAssignCustomer = this.showAssignCustomer.bind(this);
    this.assignCustomer = this.assignCustomer.bind(this);
    this.showEditNote = this.showEditNote.bind(this);
    this.updateNote = this.updateNote.bind(this)
    this.cancelEditNote = this.cancelEditNote.bind(this)
  }
  showAssignCustomer(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showEditField: {assignCustomer: true }});
  }
  showDescEdit() {
    this.setState({ showEditField: { description: true } });
  }
  showTitleEdit() {
    this.setState({ showEditField: { title: true} });
  }

  cancelTitle() {
    this.setState({ showEditField: { title: false } });
  }
  cancelDesc() {
    this.setState({ showEditField: { description: false } });
  }
  cancelEditNote(){
    this.setState({ showEditField: {note: false}})
  }

  async updateNote(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const title = e.target.title.value
    const context = e.target.context.value
    const note = {title, context}
    const id = e.target.id
    this.setState({showEditField: {note: false}})
    
    const newNote = await this.props.updateNote(note, id)
    this.setState({note: this.props.note, ticketNotes: this.props.ticketNotes, notes: this.props.notes})

  }

  handleChange(e) {
    //const ticket = {[e.target.name]: e.target.value}
    //console.log(ticket)
    //   this.setState( { captures: [...this.state.suggestions, suggestion] })
    // this.setState( { description: e.target.value })
  }
  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const note = {
      title: e.target.title.value,
      context: e.target.context.value,
    };
    this.props
      .putNote(note, this.state.ticket._id)
      .then((note) =>
        this.setState({ ticketNotes: [...this.state.ticketNotes, note] })
      );
    e.target.title.value = "";
    e.target.context.value = "";
  }
  showEditNote(e) {
    this.setState({ noteID: e, showEditField: { note: true } });
  }
  async saveTicket(input) {
    input.stopPropagation();
    input.preventDefault();
    const ticketOrigin = this.state.ticket.origin;
    let ticket;
    if (input.target.title) {
      ticket = await this.props.saveTicket(
        { title: input.target.title.value, origin: ticketOrigin },
        this.state.ticket._id
      );
      this.setState({ ticket, showEditField: { title: false } });
    }
    if (input.target.description) {
      ticket = await this.props.saveTicket(
        { description: input.target.description.value, origin: ticketOrigin },
        this.state.ticket._id
      );
      this.setState({ ticket, showEditField: { description: false } });
    }
  }
  deleteNote(id) {
    this.props.removeNote(id);
    this.setState({
      ticketNotes: this.state.ticketNotes.filter((note) => note._id !== id),
    });
  }
  async assignCustomer(e) {
    e.preventDefault();
    e.stopPropagation();
    const ticketID = this.state.ticket._id;
    const customerID = e.target.customer.value;
    const updatedTicket = await this.props.updateOrigin(ticketID, customerID);
    this.setState({ ticketCustomer: updatedTicket.customer, ticket: updatedTicket.ticket, showEditField: { assignCustomer: false} });
  }

  componentDidMount() {
    if (this.state.ticketNotes.length < 0) return;
    else
      fetch("/tickets/" + this.props.match.params.id, {
        method: "GET",
        headers: {
          authkey: CLIENT_API,
        },
      })
        .then((response) => response.json())
        .then((blob) =>
          this.setState({
            ticket: blob.ticket,
            ticketNotes: blob.ticketNotes,
            ticketCustomer: blob.ticketCustomer,
          })
        );
  }
  render() {
    const ticketNotes = this.state.ticketNotes;
    const title = this.state.ticket.title;
    const description = this.state.ticket.description;
    return (
      <div className="index">
        <div className="ticket-title">
          <div className="ticket-customer">
            {this.state.ticket.origin !== undefined ? (
              <Link to={`/customers/${this.state.ticket.origin}`}>
                {this.state.ticketCustomer.name}
              </Link>
            ) : (
              <Link to="/tickets">To Tickets</Link>
            )}
            {this.state.showEditField.assignCustomer === true ||
            this.state.ticket.origin === undefined ? (
              <AssignCustomer assignCustomer={this.assignCustomer} customers={this.props.customers} />
            ) : (
              <form onSubmit={this.showAssignCustomer}>
                <button type="submit">Assign Different</button>
              </form>
            )}
          </div>
          {this.state.ticket.title === undefined ||
          this.state.ticket.title === "" ||
          this.state.showEditField.title === true ? (
            <SaveTicket onSubmit={this.saveTicket} title cancelTitle={this.cancelTitle} ticket={this.state.ticket} />
          ) : (
            <h1>
              {title}{" "}
              <Link
                to={`/tickets/${this.state.ticket._id}`}
                onClick={this.showTitleEdit}
              >
                {" "}
                /{" "}
              </Link>
            </h1>
          )}
          <Link
            onClick={() => this.props.removeTicket(this.state.ticket._id)}
            to={`${
              this.state.ticket.origin !== undefined
                ? `/customers/${this.state.ticket.origin}`
                : "/tickets"
            }`}
          >
            x
          </Link>
        </div>{" "}
        {this.state.ticket.description === undefined ||
        this.state.ticket.description === "" ||
        this.state.showEditField.description === true ? (
          <h1>
            <form onSubmit={this.saveTicket}>
              <input
                placeholder={description ? description : "enter a description"}
                name="description"
                defaultValue={this.state.ticket.description}
              />
              <button type="submit">Save</button>
              {description === undefined ? null : (
                <button onClick={this.cancelDesc}>Cancel</button>
              )}
            </form>
          </h1>
        ) : (
          <h2>
            {description}{" "}
            <Link
              to={`/tickets/${this.state.ticket._id}`}
              onClick={this.showDescEdit}
            >
              {" "}
              /{" "}
            </Link>
          </h2>
        )}
        <TicketsPage handleSubmit={this.handleSubmit} deleteNote={this.deleteNote} showEditNote={this.showEditNote} cancelEditNote={this.cancelEditNote} onSubmit={this.updateNote} ticketNotes={this.state.ticketNotes} noteID={this.state.noteID} showEditField={this.state.showEditField} />
      </div>
    );
  }
}

export default Ticket;
