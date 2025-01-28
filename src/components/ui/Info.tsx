import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Info = () => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-3 ">
      <article className="rounded-xl m-2 p-0.5 border-2 border-neutral-700 overflow-hidden">
          <div className="rounded-[10px] p-4 !pt-20 sm:p-6 bg-neutral-900 h-96">
            <Image
              src="/JETON.png"
              alt="Ethereum Logo"
              className="w-16 h-16 mb-4 mx-auto " 
              height={100}
              width={100}
            />
            <h3 className="mt-0.5 text-lg font-medium text-white text-center ">
              Create Your Own Game
            </h3>
            <p className="mt-4 text-sm text-gray-300 text-center">
              The blockchain ensures the <span className='font-bold text-purple-800' >authenticity</span> of games.<br/><br/> Once registered, you will take a pourcentage by a pool of your game winning
              <span className='font-bold text-purple-800' > now you will be able to own your own games, your own casino</span> with Multislot and solana, offering unparalleled security and protection against fraud.
            </p>
          </div>
        </article>
        <article className="rounded-xl m-2 p-0.5 border-2 border-neutral-700">
          <div className="rounded-[10px] p-5 !pt-20 sm:p-6 bg-neutral-900 h-96">
            <Image
              src="/blockchain (1).png"
              alt="Blockchain Logo"
              className="w-16 h-16 mb-4 mx-auto" 
              height={100}
              width={100}
            />
            <h3 className="mt-0.5 text-lg font-medium text-white text-center">
              Play The Game Made By The Community
            </h3>
            <p className="mt-4 text-sm text-gray-300 text-center">
              A whole community of game maker will make Multislot a great place to have fun and play fair game and solana make this totaly <span className='font-bold text-purple-800' >transparent</span>.
            </p>
          </div>
        </article>
        <article className="rounded-xl m-2 p-0.5 border-2 border-neutral-700">
          <div className="rounded-[10px] p-6 !pt-20 sm:p-6 bg-neutral-900 h-96">
            <Image
              src="/contract.png"
              alt="Contract Logo"
              className="w-16 h-16 mb-4 mx-auto " 
              height={100}
              width={100}
            />
            <h3 className="mt-0.5 text-lg font-medium text-white text-center">
              Win Money
            </h3>
            <p className="mt-4 text-sm text-gray-300 text-center">
              You will by your own game <span className='font-bold text-purple-800' >win money </span>, <span className='font-bold text-purple-800' > a lot of Slot Machine and more game will come</span>, <span className='font-bold text-purple-800' >
                A real community of players and game maker will start</span> but there more to come...
            </p>
          </div>
        </article>
      </div>
  )
}

export default Info
