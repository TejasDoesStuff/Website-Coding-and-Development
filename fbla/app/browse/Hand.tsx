import React from "react"
import Card from "./Card"

const Hand = () => {
    return (
        <div className="w-full h-auto flex items-center p-12 flex-wrap">
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    )
}

export default Hand