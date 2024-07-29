import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-blue-950 h-14 flex justify-around items-center font-bold'>
        <div className='text-green-400 text-2xl'>
            <span>&lt;</span> 
            <span className='text-white'>Pass</span><span>OP/&gt;</span>
        </div>
        <button className='flex items-center gap-2 bg-green-600 text-white rounded-full p-1 ring-white ring-1'>
            <img className='invert w-8' src="/icons/github.svg" alt="GitHub logo" />
            <span>GitHub</span>
        </button>
    </nav>
  )
}

export default Navbar
