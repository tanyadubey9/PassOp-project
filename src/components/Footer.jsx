import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-blue-950 h-14 flex flex-col items-center justify-center font-bold'>
        <div className='text-green-400 text-xl'>
            <span>&lt;</span> 
            <span className='text-white'>Pass</span><span>OP/&gt;</span>
        </div>
        <div className='text-white flex'>
          Created with <img className='w-6 h-6 mx-2' src="/icons/heart.png" alt="heart" /> by Tanya_Dubey
        </div>
    </footer>
  )
}

export default Footer
