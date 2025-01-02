import React from 'react'
import Row from './Hand'

const Deck = () => {
    return (
        <div className = "w-screen h-auto bg-background justify-center items-center flex">
            <Row />
            <Row />
            <Row />
        </div>
    )
}

export default Deck