import React, { Component } from 'react'
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            newPaletteName: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.showEmojiPicker = this.showEmojiPicker.bind(this)
        this.savePalette = this.savePalette.bind(this)
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
        this.props.palettes.every(
            ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
        ))
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    showEmojiPicker() {
        this.setState({ stage: 'emoji' })
    }
    savePalette(emoji) {
        const newPalette = {
            paletteName: this.state.newPaletteName,
            emoji: emoji.native
        }
        this.props.handleSubmit(newPalette)
        this.setState({ state: '' })
    }
    render() {
        const { newPaletteName } = this.state
        const { hideForm } = this.props
        return (
            <div>
            <Dialog open={this.state.stage === 'emoji'} onClose={hideForm} >
                <DialogTitle id='form-dialog-title'>
                    pick your pal.it emoji
                </DialogTitle>
                <Picker title='Choose your pal.it emoji!' onSelect={this.savePalette} />
            </Dialog>
            <Dialog
            open={this.state.open}
            onClose={hideForm}
            aria-labelledby='form-dialog-title'
            >
            <DialogTitle id='form-dialog-title'>enter your pal.it name</DialogTitle>
            <ValidatorForm
                onSubmit={this.showEmojiPicker}
                >
            <DialogContent>
                <DialogContentText>
                Please enter a unique name for your pal.it!
                </DialogContentText>
                <TextValidator
                    label='Palette Name'
                    value={newPaletteName}
                    fullWidth
                    margin='normal'
                    name='newPaletteName'
                    onChange={this.handleChange}
                    validators={["required", "isPaletteNameUnique"]}
                    errorMessages={["Enter Palette Name", "Name already used"]}
                />
            </DialogContent>
                <DialogActions>
                    <Button onClick={hideForm} color='primary'>
                    Cancel
                    </Button>
                    <Button variant='contained' color='primary' type='submit'>
                    Save Palette
                    </Button>
                </DialogActions>
                </ValidatorForm>
            </Dialog>
            </div>
        )
    }
}

export default PaletteMetaForm