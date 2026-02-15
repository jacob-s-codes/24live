import React from 'react'
import Logo from '../Login/Logo'

const Navbar = () => {
  return (
    <div className='w-full z-30 top-0 sticky bg-darkblue flex flex-row items-center justify-between px-12 py-4 text-white'>
        <div className='w-20 h-auto'>
            <a href="/"><Logo/></a>
        </div>
        <div className='flex flex-row items-center justify-center gap-x-12 uppercase text-xl'>
            <a href="/play" className='hover:text-yellow'>Play</a>
            <a href="/rules" className='hover:text-yellow'>Rules</a>
            <a href="/login" className='bg-yellow text-darkblue hover:bg-lightyellow px-8 py-2 rounded-lg'>Login</a>
        </div>
    </div>
  )
}

export default Navbar