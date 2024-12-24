import React from 'react'

const Header = () => {
  return (
    <div className = "w-screen min-h-24 bg-background p-5 text-xl flex items-center max-sm:flex-col">
        <h1 className = "text-text font-bold absolute max-sm:pb-8 max-sm:relative">Conext</h1>
        <div className = "flex-grow"></div>
        <div className = "flex flex-row items-center gap-16 w-full mx-auto justify-center [&>*]:w-16 text-md">
            <div className = "text-text">Home</div>
            <div className = "text-text">Browse</div>
            <div className = "text-text">Dashboard</div>
        </div>
        <div className = "flex-grow"></div>
        <div className = "rounded-full bg-text aspect-square h-[5%] absolute right-5"></div>
    </div>
  )
}

export default Header