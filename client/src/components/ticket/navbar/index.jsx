import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import SnackBar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import Slider from 'rc-slider'
import "rc-slider/assets/index.css"
import styles from './styles'

class Navbar extends Component {
    constructor(props){
        super(props)
        this.state = { format: 'hex', open: false, values: [] }
        this.handleFormatChange = this.handleFormatChange.bind(this)
        this.closeSnackBar = this.closeSnackBar.bind(this)
    }
    handleFormatChange(e) {
        this.setState({ format: e.target.value, open: true })
        this.props.handleChange(e.target.value)
    }
    closeSnackBar() {
        this.setState({ open: false })
    }
    render() {
        const { level, changeLevel, showingAllColors, classes } = this.props
        const { format } = this.state
        return (
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to='/'>
                        tick.it
                    </Link>
                </div>
                {showingAllColors && (
                <div className='slider-container'>
                    <span>Level: {level}</span>
                    <div className={classes.slider}>
                        <Slider
                        defaultValue={level}
                        min={100}
                        max={900}
                        step={100}
                        onAfterChange={changeLevel}
                        />
                    </div>
                </div>
                )}
                <div className={classes.selectContainer}>
                    <Select value={format} onChange={this.handleFormatChange}>
                        <MenuItem value='hex'>HEX {this.props.hex}</MenuItem>
                        <MenuItem value='rgb'>RGB {this.props.rgb}</MenuItem>
                        {/* <MenuItem value='rgba'>RGBA - rgba(255,255,255, 1.0)</MenuItem> */}
                        <MenuItem value='hsl'>HSL {this.props.hsl}</MenuItem>
                    </Select>
                </div>
                <SnackBar
                anchorOrigin={
                    {vertical: 'bottom', horizontal: 'left' }
                }
                open={this.state.open}
                autoHideDuration={3000}
                message={
                  <span id="message-id">Format Changed to { format.toUpperCase() }</span>
                }
                ContentProps={
                   { 'aria-describedby': 'message-id' }
                }
                onClose={this.closeSnackBar}
                action={[
                    <IconButton onClick={this.closeSnackBar} color='inherit' aria-label='close'>
                        <CloseIcon />
                    </IconButton>
                ]}
                />
            </header>
        )
    }
}

export default styles(Navbar)