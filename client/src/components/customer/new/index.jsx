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
              name: '',
              phone: '',
              suggestions: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    handleChange(e) {
        this.setState( { [e.target.name]: e.target.value })
    }
    handleSuggestion(e) { 
        const suggestion = {[e.target.name]: e.target.value}
       // this.setState( { suggestions: [...this.state.suggestions, suggestion] })
        console.log(suggestion)
    }
    handleSubmit(e) {
        e.preventDefault()
        e.stopPropagation()
        const customer = {name: e.target.name.value, phone: e.target.phone.value}

        this.props.saveCustomer(customer)
        this.props.history.push(`/customer/`)
    }
    handleClick(e) {
        e.preventDefault()
        e.stopPropagation()

    }
    anotherInput(e) {
        //this.setState({ suggestions: [...this.state.suggestions, e.target.parentNode.parentNode] })
        console.log( e.target.parentNode.parentNode)
        let div = document.createElement('div')
        let suggestionLabel = document.createElement('label')
        let extraInput = document.createElement('input')
        let extraResponse = document.createElement('input')
        let newButton = document.createElement('button')
        newButton.innerText = '+'
        newButton.onClick = this
        div.innerHTML = `
            <label for="suggestion">Suggestion: </label>
            <input type="text" id="extra" name="extra" onChange={this.handleChange}/>: 
            <input type="text" id="response" name="response" onChange={this.handleChange}/>
             <button onClick={this.anotherInput}>+</button><br />
             `
        div.append(newButton)
        console.log(div)
        // let typeOf;
        // if (sel === "#checks") {
        //     typeOf = "slip";
        // } else if (sel === "#pennies") {
        //     typeOf = "check";
        // }
        // const id = typeOf + "_" + o
        // const div = document.createElement("div");
        // div.classList = `input ${typeOf}`;
        // div.innerHTML = `
        // <input "type="number" placeholder="Additional ${
        //     typeOf[0].toUpperCase() + typeOf.slice(1)
        // }"><button onclick='remInput("${id}")' class="rem">x</button> $<span>0.00</span> ${
        //     typeOf[0].toUpperCase() + typeOf.slice(1)
        // }
        // `;
        // div.id = id;
        // o++;
        // document.body.insertBefore(div, document.querySelector(sel));
        // calculate();
        // document.querySelector(`#${div.id} input`).focus();
    };

    render() {
        const { classes, maxColors, palettes } = this.props
        const { open, colors } = this.state
        return (
    <form onSubmit={this.handleSubmit}>
    
             <label for="name">Customer Name: </label><input required type="text" id="name" name="name" onChange={this.handleChange}/><br />
             <label for="phone">Phone Number: </label><input type="number" id="phone" name="phone" onChange={this.handleChange}/><br />
            {/* <div>
            <label for="suggestion">Suggestion: </label><input type="text" id="extra" name="extra" onChange={this.handleSuggestion}/>: <input type="text" id="response" name="response" onChange={this.handleSuggestion}/>
             <button onClick={this.anotherInput}>+</button><br />
            </div> */}
         
         <button id="submit" >Submit</button>
      
    </form>  
    
        )
    }
}

export default styles(NewCustomerForm)