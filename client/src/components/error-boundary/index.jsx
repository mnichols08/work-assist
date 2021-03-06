import React from 'react'

import {
    ErrorImageOverlay,
    ErrorImageContainer,
    ErrorImageText
} from './styles'


class ErrorBoundary extends React.Component {
    constructor() {
        super()

        this.state = {
            hasErrored: false
        }
    }

    static getDerivedStateFromError(error) {
        return { hasErrored: true}
    }

    componentDidCatch(error, info) {
        console.error(error)
    }

    render() {
        if (this.state.hasErrored) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/yW2W95C.ong' />
                    <ErrorImageText>Sorry this page is broken</ErrorImageText>
                </ErrorImageOverlay>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary