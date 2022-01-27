import React from 'react'

import styles from './styles'

function TicketFooter(props) {
    const { ticketName, emoji, classes } = props
    return (
        <footer className={classes.TicketFooter}>
            { ticketName }
            <span className={classes.emoji}>{ emoji }</span>
        </footer>
    )
}

export default styles(TicketFooter)