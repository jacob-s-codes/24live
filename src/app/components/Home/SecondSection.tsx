import React from 'react'
import { MacbookScroll } from './macbook-scroll'


const SecondSection = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center text-white'>
      <MacbookScroll />
      <h2 className='text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-darkblue to-lightblue mt-64'>How does it work?</h2>
      <div className="flex gap-x-16 mt-12 items-start pb-96">

        {/* Sticky image */}
        <img
          src="/logo.png"
          alt="logo"
          className="rounded-lg w-xl h-auto sticky top-36 self-start"
        />

        {/* Scrolling text content */}
        <div className="space-y-96 max-w-lg">
          <section>
            <h3 className="text-4xl font-bold mb-4">Play Online</h3>
            <p className="text-xl">
              Play online against people from around the world! Challenge your friends
              or compete against random opponents to test your skills and climb the
              global leaderboard.
            </p>
          </section>

          <section>
            <h3 className="text-4xl font-bold mb-4">Compete</h3>
            <p className="text-xl">
              Improve your ranking and challenge stronger opponents as you go.
            </p>
          </section>

          <section>
            <h3 className="text-4xl font-bold mb-4">Win Rewards</h3>
            <p className="text-xl">
              Earn badges and achievements for your progress.
            </p>
          </section>
        </div>

      </div>

    </div>
  )
}

export default SecondSection