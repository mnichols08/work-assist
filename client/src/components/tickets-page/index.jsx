import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
  } from "react-router-dom";

class TicketsPage extends Component {
    
    render(){
        return (
            <div className="tickets page">
          <h3>Notes</h3>
          {this.props.ticketNotes.map((note) => (
            <div key={note._id}>
              <h4>
                {this.props.showEditField.note === true && this.props.noteID == note._id ? (
                  <form onSubmit={this.props.onSubmit} id={note._id}>
                    <input defaultValue={note.title} type="text" name="title" placeholder="enter a note" />
                <select name="type" id="type">
                  <option value="note">Note</option>
                  <option value="todo" disabled>
                    To Do
                  </option>
                </select>
                <br />
                <textarea
                  defaultValue={note.context}
                  name="context"
                  placeholder="provide some more detail (optional)"
                ></textarea>
                <button type="submit">Submit</button>
                <button onClick={this.props.cancelEditNote}>Cancel</button>
                  </form>
                ) : (
                  <>{note.title} <br/>
                  {note.context}</>
                )}{" "}
                <Link to="#" onClick={() => this.props.showEditNote(note._id)}>{` / `}</Link> |{" "}
                <Link
                  to="#"
                  onClick={() => this.props.deleteNote(note._id)}
                >{` x `}</Link>{" "}
              </h4>
              
            </div>
          ))}
          <form onSubmit={this.props.handleSubmit}>
            <h4>Create Note</h4>
      
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
     
          </form>
        </div>
        )
    }
}

export default TicketsPage