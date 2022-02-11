import React from 'react'

import SignIn from '../../components/sign-in/'
import SignUp from '../../components/sign-up/'

import { AuthContainer } from './styles'

const AuthPage = () => (
    <AuthContainer>
        <SignIn />
        <SignUp />
    </AuthContainer>
)

export default AuthPage