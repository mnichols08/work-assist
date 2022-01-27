import React, { PureComponent } from 'react'
import DeleteIcon from '@material-ui/icons/Delete'


import styles from './styles'
class MiniCustomer extends PureComponent {
    constructor(props) {
        super(props)
        this.deleteCustomer = this.deleteCustomer.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    deleteCustomer(e) {
        e.stopPropagation()
        this.props.openDialog(this.props.id)
    }
    handleClick() {
        this.props.goToCustomer(this.props.id)
    }
    
    render() {
        const { classes, customer } = this.props

        return (
            <div className={classes.root} onClick={this.handleClick}>
                <DeleteIcon 
                    className={classes.deleteIcon}
                    style={{ transition: 'all .3s ease-in-out' }}
                    onClick={this.deleteCustomer}
                />
              <div className={classes.colors}></div>
              <h5 className={classes.title}>
                {customer.name}   
              </h5>
            </div>
        )
    }
}

export default styles(MiniCustomer)