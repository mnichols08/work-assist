import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ColorBox from '../color-box'
import Navbar from '../navbar'
import TicketFooter from '../footer'

import styles from '../component/styles'

class MonoTicket extends Component {
    constructor(props) {
      super(props)
      this.changeFormat = this.changeFormat.bind(this)
      this.state = { format: "hex" }
      this._shades = this.gatherShades(this.props.ticket, this.props.colorId)
    }
    gatherShades(ticket, colorToFilterBy) {
      let shades = []
      let allColors = ticket.colors
  
      for (let key in allColors) {
        shades = shades.concat(
          allColors[key].filter(color => color.id === colorToFilterBy)
        )
      }
      //return all shades of given color
      return shades.slice(1)
    }
    changeFormat(val) {
      this.setState({ format: val })
    }
    render() {
      const { format } = this.state
      const { classes } = this.props
      const { ticketName, emoji, id } = this.props.ticket
      const colorBoxes = this._shades.map(color => (
        <ColorBox
          key={color.name.replace(/ /g, '')}
          name={color.name}
          background={color[format]}
          showingFullTicket={false}
        />
      ))
      return (
        <div className={classes.Ticket}>
          <Navbar handleChange={this.changeFormat} showingAllColors={false} />
            <div className={classes.colors}>
              { colorBoxes }
              <div className={classes.goBack}>
                <Link to={`/ticket/${id}`}>GO BACK</Link>
              </div>
            </div>
          <TicketFooter ticketName={ticketName} emoji={emoji} />
        </div>
      )
    }
  }

  export default styles(MonoTicket)