import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import "./notes.css";
class NoteIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { notes: [], searchField: "", showNewField: false };
    this.showNewField = this.showNewField.bind(this);
    this.createNote = this.createNote.bind(this);
  }
  showNewField() {
    this.setState({ showNewField: true });
  }
  async createNote(input) {
    input.stopPropagation();
    input.preventDefault();
    const newNote = {
      title: input.target.title.value,
      context: input.target.context.value,
    };
    let ticket = input.target.ticket.value;

    input.target.title.value = "";
    input.target.context.value = "";
    input.target.ticket.value = 'New Ticket'

    if (
      ticket === "New Ticket" ||
      !ticket ||
      ticket === null ||
      ticket == undefined
    ) {
      ticket = "";
    }
    const note = await this.props.createNote(newNote, ticket);
    this.setState({ notes: [...this.state.notes, note] });
    if (ticket !== '') this.props.history.push(`/tickets/${ticket}`);
    
  }
  deleteNote(id) {
    this.props.removeNote(id);
    this.setState({
      notes: this.state.notes.filter((note) => note._id !== id),
    });
  }
  componentDidMount() {
    fetch("/notes")
      .then((response) => response.json())
      .then((blob) =>
        this.setState({ notes: blob.data, searchField: this.props.searchField })
      );
  }
  componentDidUpdate() {
    if (this.state.searchField !== this.props.searchField)
      this.setState({ searchField: this.props.searchField });
  }
  render() {
    const { notes, searchField } = this.state;
    let filteredNotes;
    try {
      filteredNotes = notes.filter((o) =>
        Object.keys(o).some((k) =>
          o[k]
            .toString()
            .toLowerCase()
            .includes(searchField.toString().toLowerCase())
        )
      );
     } catch {
      console.log("fall back to lame search");
      filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchField.toLowerCase())
      );
    }
    return (
      <main className="index">
        <h1>Note Index</h1>
        {this.state.showNewField == true || this.state.notes.length < 2 ? (
          <form onSubmit={this.createNote} className="createNote">
            <h4>Create Note</h4>
            <input type="text" name="title" placeholder="enter a title" />
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
            <div>
              <label>Ticket:</label>
              <select name="ticket" defaultValue='New Ticket'>
                <option key="placeholder" disabled>
                  New Ticket
                </option>
                {this.props.tickets.map((ticket) => (
                  <option key={ticket._id} value={ticket._id}>
                    {ticket.title}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Submit</button>{" "}
          </form>
        ) : (
          <button onClick={this.showNewField}>New Note</button>
        )}
        {filteredNotes.map((note) => (
          <div className="notes" key={note._id}>
            <Link
              onClick={() => this.props.getTicket(note.origin)}
              to={this.props.tickets.some(ticket => ticket._id === note.origin) ? `/tickets/${note.origin}` : `/notes/`}
              key={note._id}
            >
              {note.title}
            </Link>
            |
            <Link
              to="#"
              onClick={() => this.deleteNote(note._id)}
            >{` x `}</Link>
          </div>
        ))}
      </main>
    );
  }
}

export default NoteIndex;
