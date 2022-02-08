import React, { Component } from "react";

class SaveTicket extends Component {
  render() {
    return (
      <h1>
        <form onSubmit={this.props.onSubmit}>
          <input
            placeholder={this.props.title ? this.props.title : "title"}
            name="title"
            defaultValue={this.props.ticket.title}
          />
          <button type="submit">Save</button>
          <button onClick={this.props.cancelTitle}>Cancel</button>
        </form>
      </h1>
    );
  }
}

export default SaveTicket;
