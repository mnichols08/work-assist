import React, { Component } from 'react'
import classNames from 'classnames'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import Divider from'@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Button from '@material-ui/core/Button'
import DragList from '../color-box/drag-list'
import { arrayMove } from 'react-sortable-hoc'

import seed from '../seed'
import ColorPickerForm from './color-picker'
import PaletteFormNav from './form-nav'
import styles from './styles'


class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props){
        super(props)
        this.state = {
            open: true,
            currentColor: '#800000',
            newColorName: '',
            colors: seed[0].colors,
            newPaletteName: ''
        }
        this.addNewColor = this.addNewColor.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.removeColor = this.removeColor.bind(this)
        this.clearColors = this.clearColors.bind(this)
        this.addRandomColor = this.addRandomColor.bind(this)
    }
    handleDrawerOpen = () => {
        this.setState({ open: true })
    }
    handleDrawerClose = () => {
        this.setState({ open: false })
    }
    clearColors() {
        this.setState({ colors: [] })
    }
    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex })
    }
    addRandomColor() {
        const allColors = this.props.palettes.map(p => p.colors).flat()
        var rand = Math.floor(Math.random() * allColors.length)
        const randomColor = allColors[rand]
        this.setState({ colors: [...this.state.colors, randomColor ]})
    }
    addNewColor(newColor) {
        this.setState({
            colors: [...this.state.colors, newColor],
            newColorName: ''
        })
    }
    removeColor(name) {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== name)
        })
    }
    handleChange(e) {
        this.setState( { [e.target.name]: e.target.value })
    }
    handleSubmit(newPalette) {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-')
        newPalette.colors = this.state.colors
        this.props.savePalette(newPalette)
        this.props.history.push('/')
    }
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex)
        }))
    }
    render() {
        const { classes, maxColors, palettes } = this.props
        const { open, colors } = this.state
        const paletteIsFull = colors.length >= maxColors
        return (
         <form>
             <label for="title">Title: </label><input type="text" id="title" /><br />
             <label for="description">Description: </label><input type="text" id="description"/><br />
             <button onSubmit={this.createCustomer}>Submit</button>
         </form>
        )
    }
}

export default styles(NewPaletteForm)