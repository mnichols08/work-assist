import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
const CLIENT_API = null;
class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ticket: this.props.ticket,
        ticketNotes: this.props.ticketNotes,
        description: ''
    }
  }
  handleDescription(e){

  }
  componentDidMount() {
    fetch("/tickets/" + this.props.match.params.id, {
        method: "GET",
        headers: {
          authkey: CLIENT_API,
        },
      })
        .then((response) => response.json())
        .then((blob) => this.setState({ ticket: blob.ticket, ticketNotes: blob.ticketNotes }));
  }
  render() {
      console.log(this.state.ticketNotes)
      const ticketNotes = this.state.ticketNotes
    return (
      <div className="index">
          <h2>{this.state.ticket.title}</h2>
          <input onChange={this.handleDescription} type="text" placeholder="description" name="description" value={this.state.ticket.description} />
          
          <div className="tickets">
           <h4>Notes</h4>
           <form onSubmit={this.newNote}>
          <input type="text" name="title" placeholder="Enter Title" />
          <textarea type="text" name="title" placeholder="Enter Title" />
          <button type="submit">Add Note</button>
        </form>
           {ticketNotes ? ticketNotes.map(note => (
               <>{note.title}</>
           )) : null}

        </div>
      </div>
    );
  }
}

export default Ticket;
