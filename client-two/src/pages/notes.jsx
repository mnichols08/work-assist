import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

class NoteIndex extends Component {
    constructor(props){
        super(props)
        this.state = { notes: this.props.notes}
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
          .then((blob) => this.setState({ notes: blob.data }));
      }
  render() {
    return (
        <main className="index">
        <h1>Note Index</h1>
        {this.state.notes.map((note) => (
          <div className="notes" key={note._id}>
            <Link
              onClick={() => this.props.getTicket(note.origin)}
              to={`/tickets/${note.origin}`}
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
