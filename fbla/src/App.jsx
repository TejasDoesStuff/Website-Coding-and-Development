import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const goon = () => {
    window.open("https://www.example.com");
  }
  return (
    <>
    <div onClick={goon} className="select-none overflow-hidden relative group z-40 cursor-pointer text-xs font-bold p-7 rounded-3xl bg-gray-800 hover:drop-shadow-2xl">
      <h1 className='relative z-20 bg-gradient-to-l from-blue-600 to-indigo-400 bg-clip-text text-transparent group-hover:text-white group-hover:[text-shadow:_2px_2px_0_rgb(255_255_255_/_20%)] group-hover:drop-shadow-[(0 10px 10px rgba(255, 255, 255, 0.1)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.06))] transition-all'>
        I love Tesla STEM FBLA!
      </h1>
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-l from-blue-600 to-indigo-400 transition-all opacity-0 group-hover:opacity-100 z-0'>
      </div>
    </div> 
    </>
  )
}

export default App
