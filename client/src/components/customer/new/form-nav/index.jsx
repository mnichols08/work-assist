import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Button from '@material-ui/core/Button'

import PaletteMetaForm from './meta-form'
import styles from './styles'

class PaletteFormNav extends Component {
    constructor(props) {
        super(props)
        this.state = { newPaletteName: "", formShowing: false }
        this.handleChange = this.handleChange.bind(this)
        this.showForm = this.showForm.bind(this)
        this.hideForm = this.hideForm.bind(this)
    }
    showForm() {
        this.setState({ formShowing: true })
    }
    hideForm() {
        this.setState({ formShowing: false})
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const { classes, open, handleSubmit, palettes } = this.props
        return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar position='fixed' color='default' className={classNames(classes.appBar, {
            [classes.appBarShift]: open
        })}>
            <Toolbar disableGutters={!open}>
                <IconButton color='inherit' aria-label='Open drawer' onClick={this.props.handleDrawerOpen} className={classNames(classes.menuButton, open && classes.hide )}>
                    <ChevronRightIcon />
                </IconButton>
                <Typography variant='h6' color='inherit' noWrap>
                    create a pal.it
                </Typography>
            </Toolbar>
            <div className={classes.navBtns}>
                <Link to='/'>
                    <Button variant='contained' color='secondary'>
                        Go Back
                    </Button>
                </Link>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={this.showForm}
                    className={classes.button}
                    >
                    Save
                </Button>
            </div>
        </AppBar>
        { this.state.formShowing && ( <PaletteMetaForm palettes={palettes} hideForm={this.hideForm} handleSubmit={handleSubmit} /> ) }
        </div>
        )
    }
}

export default styles(PaletteFormNav)