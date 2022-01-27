import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { ChromePicker } from 'react-color'

import styles from './styles'

class ColorPickerForm extends Component {
    constructor(props) {
        super(props)
        this.state = { currentColor: '#800000', newColorName: "" }
        this.updateCurrentColor = this.updateCurrentColor.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        ValidatorForm.addValidationRule("isColorNameUnique", value =>
        this.props.colors.every(
          ({ name }) => name.toLowerCase() !== value.toLowerCase()
        )
      )
      ValidatorForm.addValidationRule("isColorUnique", () =>
        this.props.colors.every(({ color }) => color !== this.state.currentColor)
      )
    }
    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex })
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit() {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        }
        this.props.addNewColor(newColor)
        this.setState({ newColorName: "" })
    }
    render() {
        const { ticketIsFull, classes } = this.props
        const { currentColor, newColorName } = this.state
        return (
            <div className={classes.root}>
                <ChromePicker
                        color={currentColor}
                        onChangeComplete={this.updateCurrentColor}
                        className={classes.picker}
                    />
                    <ValidatorForm onSubmit={this.handleSubmit} ref='form'>
                        <TextValidator
                            name='newColorName'
                            value={newColorName}
                            className={classes.colorNameInput}
                            placeholder='Color Name'
                            variant='filled'
                            margin='normal'
                            onChange={this.handleChange}
                            validators={['required', 'isColorNameUnique', 'isColorUnique']}
                            errorMessages={['Enter a color name', 'Color name must be unique', 'Color already used!']}
                        />
                        <Button className={ classes.addColor } variant='contained' type='submit' color='primary' disabled={ticketIsFull} style={{ backgroundColor: ticketIsFull
                            ? 'grey'
                            : currentColor
                        }}>
                            { ticketIsFull ? 'full pal.it' : 'Add Color'}
                        </Button>
                    </ValidatorForm>
            </div>
        )
    }
}

export default styles(ColorPickerForm)