import React from 'react'
import Navbar from '../components/Home/Navbar'

const page = () => {
  return (
    <div className='bg-gradient-to-b from-darkblue to-yellow h-screen'>
        <Navbar/>
        <div className='mt-12'>
            <h1 className='uppercase font-black text-7xl text-center text-white'>How to play</h1>
        </div>
    </div>
  )
}

export default page