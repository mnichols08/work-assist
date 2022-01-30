import React, { Component } from "react";

class NoteIndex extends Component {
    constructor(props){
        super(props)
        this.state = { deleteID: ''}
    }

  render() {
    return (
      <main className="index">
        <p>Note Index</p>
        <ul>
            {this.props.notes.map(note => (
                 
                    <li key={note._id}>{note.title } { note.description ? `| ${note.description}` : note.description}</li>
                
            ))}
        </ul>
      </main>
    );
  }
}

export default NoteIndex;
