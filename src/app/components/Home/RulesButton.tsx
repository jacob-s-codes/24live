import React from 'react'

const PlayNow = () => {
    return (
        <div className='flex flex-row items-center gap-x-4 uppercase text-2xl'>
            {/* <a href="/play" className='bg-yellow text-darkblue hover:bg-lightyellow px-8 py-2 rounded-lg'>Start Playing Now!</a> */}
            <a href="/rules" className="relative px-5 py-2 overflow-hidden font-medium text-white bg-gradient-to-r from-pinkaccent to-orangeaccent border border-white rounded-lg shadow-inner group">
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-darkblue group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-darkblue group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-darkblue group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-darkblue group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-darkblue opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">View Rules</span>
            </a>
            {/* <a href="/login" classNameNameName='bg-yellow text-darkblue hover:bg-lightblue hover:text-white px-8 py-2 rounded-lg'>Login</a> */}
        </div>
    )
}

export default PlayNow