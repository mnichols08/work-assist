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

import MiniTicket from "./mini"
import styles from './styles'
import customer from "../customer"

class TicketIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openDeleteDialog: false,
      deleteId: '',
      customer: props.customer,
      allTickets: props.allTickets
    }
    this.openDialog = this.openDialog.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.handleDelete = this.handleDelete.bind(this)

  }

  openDialog(id) {
    this.setState({ openDeleteDialog: true, deleteId: id })
  }
  closeDialog() {
    this.setState({ openDeleteDialog: false, deleteId: '' })
  }
  handleDelete() {
    this.props.deleteTicket(this.state.deleteId)
    this.closeDialog()
  }
  
  render() {
    const { openDeleteDialog, allTickets } = this.state
    const { customer, classes } = this.props
   const filteredTickets = allTickets.filter(ticket => ticket.origin === customer._id)

    return (
      <div >
      
        <div className={classes.container}>
          <nav className={classes.nav}> 
            <h1>Tick.et</h1>
            <Link to='/ticket/new'>create a tick.et</Link>
          </nav>
          <TransitionGroup className={classes.tickets}>
            {filteredTickets.map(ticket => (
              <li>
              {ticket.title}
              </li>
              // <CSSTransition key={ticket._id} classNames='fade' timeout={500}>
              //   <MiniTicket
              //     key={ticket._id}
              //     id={ticket._id}
              //     openDialog={this.openDialog}
              //     ticket={ticket}
              //     goToTicket={this.goToTicket}
              //   />
              // </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={openDeleteDialog}
          aria-labelledby='delete-dialog-title'
          onClose={this.closeDialog}
        >
          <DialogTitle id='delete-dialog-title'>
            delete tick.et?
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
export default styles(TicketIndex)
