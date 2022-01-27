import React, { Component } from 'react'
import classNames from 'classnames'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import Divider from'@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Button from '@material-ui/core/Button'
import DragList from '../../ticket/color-box/drag-list'
import { arrayMove } from 'react-sortable-hoc'

import ColorPickerForm from './color-picker'
import PaletteFormNav from './form-nav'
import styles from './styles'


class NewCustomerForm extends Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props){
        super(props)
        this.state = {
            open: true,
            currentColor: '#800000',
            newColorName: '',
            newPaletteName: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    handleChange(e) {
        this.setState( { [e.target.name]: e.target.value })
    }
    handleSubmit(newCustomer) {
        console.log(newCustomer)
       // this.props.savePalette(newPalette)
       // this.props.history.push('/')
    }
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex)
        }))
    }
    render() {
        const { classes, maxColors, palettes } = this.props
        const { open, colors } = this.state
        return (
         <form>
             <label for="title">Title: </label><input type="text" id="title" /><br />
             <label for="description">Description: </label><input type="text" id="desc" /><br />
             <button onSubmit={this.handleSubmit()}>Submit</button>
         </form>
        )
    }
}

export default styles(NewCustomerForm)