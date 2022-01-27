import React, { Component } from 'react'
import ColorBox from '../color-box'
import Navbar from '../navbar'
import TicketFooter from '../footer'

import styles from './styles'

class Ticket extends Component {
    constructor(props) {
        super(props)
        this.state = { level: 500, format: 'hex' }
        this.changeLevel = this.changeLevel.bind(this)
        this.changeFormat = this.changeFormat.bind(this)
    }
    changeLevel(level) {
        this.setState({ level })
    }
    changeFormat(val) {
        this.setState({ format: val })
    }
    render() {
        const { colors, ticketName, emoji, id } = this.props.ticket
        const { classes } = this.props
        const { level, format } = this.state
        const colorBoxes = colors[level].map(color => 
            (<ColorBox background={color[format]} name={color.name} key={color.id} moreUrl={`/ticket/${id}/${color.id}`} showFullTicket />) )
        return (
            <div className={classes.Ticket}>
                <Navbar 
                    level={ level }
                    changeLevel={ this.changeLevel }
                    handleChange={this.changeFormat}
                    showingAllColors
                />
                <div className={classes.colors}>
                    { colorBoxes } 
                </div>
                <TicketFooter
                 ticketName={ticketName} emoji={emoji} />
            </div>
        )
    }
}

export default styles(Ticket)