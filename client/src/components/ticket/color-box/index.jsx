import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Link } from 'react-router-dom'

import styles from './styles'

class ColorBox extends Component {
    constructor(props) {
        super(props)
        this.state = { copied: false }
        this.changeCopyState = this.changeCopyState.bind(this)
    }
    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1500)
        })
    }
    render() {
        const { name, background, moreUrl, showFullTicket, classes } = this.props
        const { copied } = this.state
        return (
            <div style={{ background }} className={classes.ColorBox}>
              <div
                style={{ background }}
                className={`${classes.copyOverlay} ${copied &&
                  classes.showOverlay}`}
              />
              <div
                className={`${classes.copyMessage} ${copied &&
                  classes.showMessage}`}
              >
                <h1>copied!</h1>
                <p className={classes.copyText}>{
                this.props.name.toUpperCase()
                }</p>
                <p className={classes.copyText}>{this.props.background.toUpperCase()}</p>
              </div>
              <div>
                <div className={classes.boxContent}>
                  <span className={classes.colorName}>{name}</span>
                </div>
                <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                    <button className={classes.copyButton}>Copy</button>
                </CopyToClipboard>
              </div>
              {showFullTicket && (
                <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                  <span className={classes.seeMore}>MORE</span>
                </Link>
              )}
            </div>            
        )
    }
}

export default styles(ColorBox)