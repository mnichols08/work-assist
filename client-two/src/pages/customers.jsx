import React, { Component } from "react";

class CustomerIndex extends Component {
      render() {
        return (
          <main className="index">
            <p>Customer Index</p>
            <ul>
                {this.props.customers.map(customer => (
                     
                        <li key={customer._id}>{customer.name} </li>
                    
                ))}
            </ul>
          </main>
        );
      }
    }

export default CustomerIndex;
