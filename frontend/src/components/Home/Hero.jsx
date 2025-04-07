import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className=':h-[75vh] flex flex-col md:flex-row items-center justify-center'> 
        <div className='w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
        <h1 className='text-4xl lg:text-6xl front-semibold text-yellow-100 text-center lg:text-left'>
            Read Between the Stars
            </h1>
            <p className='margin-4 text-xl text-zinc-300 text-center lg:text-left'>
            Drift through stardust and stories — We invite you into gentle worlds where wonder glows quietly between the lines.
            </p>
           <div className='mt-8'>
             <Link to="/all-books" className='text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full'>
                Discover Books
            </Link></div>
            </div>
        <div className='w-full lg:w-3/6 h-auto h-[100%]hero-image flex items-center justify-center'>
        <img src="./hero22.gif" alt="hero" />
        </div>
        </div>
  )
}

export default Hero