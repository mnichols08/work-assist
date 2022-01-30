import React from 'react'
import './App.css';

import Header from './header'
import Footer from './footer'

function Page({ children }) {
    return (
    <section className='page'>
        <Header />
        { children }
        <Footer />
    </section>
    )
}

export default Page