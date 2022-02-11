import React, { useState } from 'react'
import { connect } from 'react-redux'

import FormInput from '../form-input/'
import CustomButton from '../custom-button/'

import { signUpStart } from '../../redux/user/actions'

import { SignUpContainer, SignUpTitle } from './styles'


const SignUp = ({ signUpStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { displayName, email, password, confirmPassword } = userCredentials

  const handleSubmit = async e => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("passwords do not match")
      return
    }

    signUpStart({ displayName, email, password })
  }

  const handleChange = e => {
    const { name, value } = e.target

    setUserCredentials({ ...userCredentials, [name]: value })
  }
    return (
      <SignUpContainer>
        <SignUpTitle>I do not have a account</SignUpTitle>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={handleChange}
            label='Display Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleChange}
            label='Confirm Password'
            required
          />
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </SignUpContainer>
    )
}

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(
  null,
  mapDispatchToProps
)(SignUp)