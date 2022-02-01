import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import "./ticket.css";
const CLIENT_API = null;
class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: this.props.ticket,
      ticketNotes: this.props.ticketNotes,
      description: this.props.ticket.description,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveTicket = this.saveTicket.bind(this);
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
  saveTicket(e) {
    e.preventDefault();
    e.stopPropagation();
    const update = {
      description: e.target.description.value,
      title: e.target.title.value,
    };
    console.log(update);
    const ticket = this.props.updateTicket(update, this.state.ticket._id);
    this.setState({ ticket });
  }
  deleteNote(id) {
    this.props.removeNote(id);
    this.setState({
      ticketNotes: this.state.ticketNotes.filter((note) => note._id !== id),
    });
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
          this.setState({ ticket: blob.ticket, ticketNotes: blob.ticketNotes })
        );
  }
  render() {
    const ticketNotes = this.state.ticketNotes;
    const title = this.state.ticket.title;
    const description = this.state.ticket.description;

    return (
      <div className="index">
        {title ? (
          <h1>{title}</h1>
        ) : (
          <form onSubmit={this.saveTicket}>
            <input
              onChange={this.handleChange}
              placeholder={title ? title : "title"}
              name="title"
              defaultValue={this.state.ticket.title}
            />
            <input
              onChange={this.handleChange}
              type="text"
              placeholder={description ? description : "description"}
              name="description"
              defaultValue={description ? description : ""}
            />
            <button type="submit" />
          </form>
        )}{" "}
        {description ? (
          <h2>{description}</h2>
        ) : (

            <input
              type="text"
              placeholder={description ? description : "description"}
              name="description"
              defaultValue={description ? description : ""}
            />

        )}
        <div className="tickets page">
          <h3>Notes</h3>
          {ticketNotes.map((note) => (
            <div key={note._id}>
              <h4>
                {note.title} |{" "}
                <Link
                  to="#"
                  onClick={() => this.deleteNote(note._id)}
                >{` x `}</Link>{" "}
              </h4>
              <p>{note.context}</p>
            </div>
          ))}
          <form onSubmit={this.handleSubmit}>
            <h4>Create Note</h4>
            <ul>
              <li>
                <input type="text" name="title" placeholder="enter a note" />
                <select name="type" id="type">
                  <option value="note">Note</option>
                  <option value="todo" disabled>
                    To Do
                  </option>
                </select>
                <br />
                <textarea
                  name="context"
                  placeholder="provide some more detail (optional)"
                ></textarea>
                <button type="submit">Submit</button>{" "}
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

export default Ticket;
