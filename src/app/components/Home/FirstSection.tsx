import React from 'react'
import Logo from '../Login/Logo'
import PlayNow from './PlayNow'

const FirstSection = () => {
    return (
        <div className='flex flex-col items-center justify-center text-white'>
            <div className='flex flex-row items-center justify-center gap-x-12 my-20'>
                <div className='flex flex-col items-start max-w-xl gap-y-12'>
                    <h1 className='uppercase font-black text-8xl text-transparent bg-clip-text bg-gradient-to-r from-pinkaccent to-orangeaccent via-white'>Play <span className='introtext'>24</span> Online</h1>
                    <h2 className='uppercase font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pinkaccent to-orangeaccent'>Play online against people from around the world!</h2>
                    <PlayNow />

                </div>
                <div>
                    <img src="/playonline.png" alt="Logo" className='w-2xl h-auto rounded-lg ' />
                </div>
            </div>
        </div>
    )
}

export default FirstSection