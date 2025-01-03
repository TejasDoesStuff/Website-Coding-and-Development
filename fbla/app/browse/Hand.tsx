import React from "react"
import Card from "./Card"

const Hand = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    )
}

export default Hand