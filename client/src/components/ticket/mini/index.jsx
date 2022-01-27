import React, { PureComponent } from 'react'
import DeleteIcon from '@material-ui/icons/Delete'

import styles from './styles'
import ticket from '..'
class MiniTicket extends PureComponent {
    constructor(props) {
        super(props)
        this.deleteTicket = this.deleteTicket.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    deleteTicket(e) {
        e.stopPropagation()
        this.props.openDialog(this.props.id)
    }
    handleClick() {
        this.props.goToTicket(this.props.id)
    }
    render() {
        // const { classes, thisTicket } = this.props
        // const ticketIndex = thisTicket.map(ticket => (
        //     <div className={classes.miniColor} key={ticket._id} >
        //     {ticket.title}
        //     </div> 
        // ))
        return (
            <>
                {this.props.ticket.title}
            </>
            // <div className={classes.root} onClick={this.handleClick}>
            //     <DeleteIcon 
            //         className={classes.deleteIcon}
            //         style={{ transition: 'all .3s ease-in-out' }}
            //         onClick={this.deleteTicket}
            //     />
            //   <div >{ ticketIndex }</div>
            
            // </div>
        )
    }
}

export default styles(MiniTicket)