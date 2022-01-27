import React, { Component } from "react"
import { Link } from 'react-router-dom'
import Dialog from "@material-ui/core/Dialog"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import ListItemText from "@material-ui/core/ListItemText"
import CheckIcon from "@material-ui/icons/Check"
import CloseIcon from "@material-ui/icons/Close"
import DialogTitle from "@material-ui/core/DialogTitle"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import blue from "@material-ui/core/colors/blue"
import red from "@material-ui/core/colors/red"

import MiniCustomer from "./mini"
import styles from './styles'

class CustomerIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openDeleteDialog: false,
      deleteId: ''
    }
    this.openDialog = this.openDialog.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.goToCustomer = this.goToCustomer.bind(this)
  }
  goToCustomer(id) {
    this.props.history.push(`/customer/${id}`)
  }
  openDialog(id) {
    this.setState({ openDeleteDialog: true, deleteId: id })
  }
  closeDialog() {
    this.setState({ openDeleteDialog: false, deleteId: '' })
  }
  handleDelete() {
    this.props.deleteCustomer(this.state.deleteId)
    this.closeDialog()
  }



  render() {
    const { openDeleteDialog } = this.state
    const { classes, customers } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}> 
            <h1>Tick.it</h1>
            <h2>Directory</h2>
            <Link to='/customer/new'>Create a Customer</Link>
          </nav>
          <TransitionGroup className={classes.tickets}>
            {customers.map(customer => (
              <CSSTransition key={customer._id} classNames='fade' timeout={500}>
                <MiniCustomer
                  key={customer._id}
                  id={customer._id}
                  openDialog={this.openDialog}
                  customer={customer}
                  goToCustomer={this.goToCustomer}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={openDeleteDialog}
          aria-labelledby='delete-dialog-title'
          onClose={this.closeDialog}
        >
          <DialogTitle id='delete-dialog-title'>
            Delete Customer?
          </DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Delete' />
            </ListItem>
            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Cancel' />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}
export default styles(CustomerIndex)
