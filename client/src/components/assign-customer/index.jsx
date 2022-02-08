import React, {Component} from 'react'

class AssignCustomer extends Component {
    render(){
        return(
            <form onSubmit={this.props.assignCustomer}>
                <select name="customer" defaultValue="Assign Customer">
                  <option key="placeholder" disabled>
                    Assign Customer
                  </option>
                  {this.props.customers.map((customer) => (
                    <option key={customer._id} value={customer._id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
                <button type="submit">Assign</button>
              </form>
        )
    }
}

export default AssignCustomer