"use client";
import React from 'react'


const Footer = () => {


    return (
        <div className='bg-darkblue text-white'>
            <hr className='border-2 border-white ' />
            <footer className="max-w-[1800px] mx-auto px-8 py-12 footer filter  md:text-lg text-sm">
                <div className="flex flex-row justify-between items-center w-full">

                    <div className="flex flex-row md:gap-x-12 gap-x-6 pr-12">
                        <img src="/logo.png" alt="24Live Logo" className="w-30 h-auto rounded-lg" />
                    </div>
                    <div className='flex flex-row items-end justify-end gap-x-12'>
                        <div className="flex flex-col justify-end items-end gap-5 text-right">

                            <a href="/" className='w-fit hover:underline'>Home</a>
                            <a href="/play" className='w-fit hover:underline'>Play</a>
                            <a href="/rules" className='w-fit hover:underline'>Rules</a>
                            
                            


                        </div>
                        <div className="flex flex-col justify-end items-end gap-5 text-right">

                            
                            <p className="">Built by <a href="https://github.com/jacob-s-codes" target='_blank'><span className={`hover:underline w-fit`}>Jacob Shaul</span></a></p>
                            <p className="">Fair Play</p>
                            <p className="">24 Live, Sf, CA</p>


                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer