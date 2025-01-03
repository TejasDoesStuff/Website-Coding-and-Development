import React from 'react'

const Header = () => {
  return (
    <div className = "relative w-screen min-h-24 bg-background p-6 text-xl flex items-center max-sm:flex-col border-b border-gray-600 dropshadow-2xl">
        <h1 className = "text-text font-bold absolute max-sm:pb-8 max-sm:relative">Conext</h1>
        <div className = "flex-grow"></div>
        <div className = "flex flex-row items-center gap-16 w-full mx-auto justify-center [&>*]:w-16 text-md">
            <div className = "text-text"><a href="/">Home</a></div>
            <div className = "text-text"><a href="/browse">Browse</a></div>
            <div className = "text-text"><a href="/dashboard">Dashboard</a></div>
        </div>
        <div className = "flex-grow"></div>
        <div className = "rounded-full bg-accent aspect-square h-2/3 absolute right-0 m-10"></div>
    </div>
  )
}

export default Header