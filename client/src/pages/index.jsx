import React, { Component } from "react";
import { withRouter } from "react-router";

import GoogleSignIn from '../components/google-sign-in'
import "./index.css";

class IndexPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <main className="index">
        <h1>Tick.it</h1>
        <p>
          Thank you for visiting my buggy af little app! I hope you like it =) Log in using a Google account to begin.
        </p>
        <p>
          Use the menu on top to navigate and to use the app, just create a customer, ticket, or note by browsing over and creating one at the index page.
        </p>
      </main>
    );
  }
}

export default withRouter(IndexPage);
