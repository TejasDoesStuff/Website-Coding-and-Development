import React from 'react'
import Header from '../components/Header'
import Search from './Search'
import Deck from './Deck'

const BrowsePage = () => {
    return (
        <div className="overflow-x-hidden">
            <Header />
            <Search />
            <Deck />
        </div>
    )
}

export default BrowsePage