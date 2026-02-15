import React from 'react'
import { MacbookScroll } from './macbook-scroll'
import PlayNow from './PlayNow'
import RulesButton from './RulesButton'


const SecondSection = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center text-white pb-24'>
      {/* <MacbookScroll /> */}
      <h2 className='text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300 mt-24'>How does it work?</h2>
      <div className="flex gap-x-16 mt-32 items-start pb-20">

        {/* Sticky image */}
        <img
          src="/logo.png"
          alt="logo"
          className="rounded-lg w-xl h-auto sticky top-36 self-start"
        />

        {/* Scrolling text content */}
        <div className="space-y-80 max-w-lg">
          <section>
            <h3 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300 uppercase">Play Online</h3>
            <p className="text-xl pb-8">
              Play online against people from around the world! Challenge your friends
              or compete against random opponents to test your skills and climb the
              global leaderboard.
            </p>

          </section>

          <section>
            <h3 className="text-4xl font-bold mb-4 uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300 mt-24">Compete</h3>
            <p className="text-xl">
              Improve your ranking and challenge stronger opponents as you go. Climb the leaderboard and show off your skills to the world!
            </p>
          </section>

          <section>
            <h3 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300 uppercase">Improve</h3>
            <p className="text-xl">
              Increase your mathematical skills and abilities as you compete and play against others. Sharpen your mental math and problem-solving skills while having fun and competing against others!
            </p>
          </section>
        </div>

      </div>
      <div className='flex flex-row items-center gap-x-4 uppercase text-3xl'>
        {/* <a href="/play" className='bg-yellow text-darkblue hover:bg-lightyellow px-8 py-2 rounded-lg'>Start Playing Now!</a> */}
        <a href="/play" className="relative px-8 py-4 overflow-hidden font-medium text-darkblue bg-yellow border border-white rounded-lg shadow-inner group">
          <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-darkblue group-hover:w-full ease"></span>
          <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-darkblue group-hover:w-full ease"></span>
          <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-darkblue group-hover:h-full ease"></span>
          <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-darkblue group-hover:h-full ease"></span>
          <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-darkblue opacity-0 group-hover:opacity-100"></span>
          <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Start Playing now</span>
        </a>
        {/* <a href="/login" classNameNameName='bg-yellow text-darkblue hover:bg-lightblue hover:text-white px-8 py-2 rounded-lg'>Login</a> */}
      </div>
      <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-darkblue to-lightblue mt-64">Try it out for yourself!</h2>
      <div className='flex flex-row-reverse items-center justify-center gap-x-12 my-12'>
        <img src="/logo.png" alt="logo" className="rounded-lg w-96 h-auto mt-12" />
        <div className='max-w-lg'>
          <h3 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-darkblue to-lightblue uppercase">Solve puzzles!</h3>
          <p className="text-xl pb-4 text-darkblue">
            Use each number once and addition, subtraction, multiplication, or division to create the number 24! If you're still confused, check out the rules page to learn how to play and get started!
          </p>
          <RulesButton />
        </div>
      </div>
      <div className='flex flex-row items-center justify-center gap-x-12 text-right'>
        <img src="/logo.png" alt="logo" className="rounded-lg w-96 h-auto mt-12" />
        <div className='max-w-lg'>
          <h3 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-darkblue to-lightblue uppercase">Learn and Have fun!</h3>
          <p className="text-xl pb-4 text-darkblue">
            Improve your speed and accuracy as you play against others and climb the leaderboard! Sharpen your mental math skills while having fun and competing against others!
          </p>
          <div className='w-full justify-end items-end flex'>
            <div className='flex flex-row items-center gap-x-4 uppercase text-2xl'>
              {/* <a href="/play" className='bg-yellow text-darkblue hover:bg-lightyellow px-8 py-2 rounded-lg'>Start Playing Now!</a> */}
              <a href="/play" className="relative px-5 py-2 overflow-hidden font-medium text-darkblue bg-yellow border border-darkblue rounded-lg shadow-inner group">
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-darkblue group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-darkblue group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-darkblue group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-darkblue group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-darkblue opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Start Playing now</span>
              </a>
              {/* <a href="/login" classNameNameName='bg-yellow text-darkblue hover:bg-lightblue hover:text-white px-8 py-2 rounded-lg'>Login</a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecondSection