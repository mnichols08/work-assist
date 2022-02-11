import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectCurrentUser } from '../../redux/user/selectors'
import { signOutStart } from '../../redux/user/actions'

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from './styles'

export const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <code>Tick.it</code>
    </LogoContainer>
    

      {currentUser ? (
        <OptionsContainer>
          
          <OptionLink to="/customers">
          CUSTOMERS
          </OptionLink>
          <OptionLink to="/tickets">
          TICKETS
          </OptionLink>
        <OptionLink onClick={signOutStart}>
          SIGN OUT
        </OptionLink>
        </OptionsContainer>
      ) : (
        <OptionsContainer>
        <OptionLink to='/login'>SIGN IN</OptionLink>
        </OptionsContainer>
      )}
      
    
    
  </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
