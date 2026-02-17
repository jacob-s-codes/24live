import React from 'react'
import Logo from '../Login/Logo'

const Navbar = () => {
  return (
    <div className='w-full z-30 top-0 sticky bg-black flex flex-row items-center justify-between px-12 py-4 text-white'>
        <div className='w-20 h-auto'>
            <a href="/" className='text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pinkaccent to-orangeaccent'>24Live</a>
        </div>
        <div className='flex flex-row items-center justify-center gap-x-12 uppercase text-xl'>
            <a href="/play" className='hover:text-orangeaccent'>Play</a>
            <a href="/rules" className='hover:text-orangeaccent'>Rules</a>
            <a href="/login" className='bg-pinkaccent text-white hover:scale-105 transition-transform duration-200 px-8 py-2 rounded-lg'>Login</a>
        </div>
    </div>
  )
}

export default Navbar