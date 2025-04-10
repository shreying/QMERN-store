import React from 'react';
import { Link } from 'react-router-dom';
import '/src/assets/flippy.css'; // make sure this is in your project

const Hero = () => {
  return (
    <div className='md:h-[75vh] flex flex-col md:flex-row items-center justify-center'>
      
      {/* Text Section */}
      <div className='w-full mb-12 lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
        <h1 className='text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left'>
          Discover Your Next Great Read
        </h1>
        <p className='mt-4 text-xl text-zinc-300 text-center lg:text-left'>
          Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books.
        </p>
        <div className='mt-8'>
          <Link to="/all-books">
            <button className='text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full'>
              Discover Books
            </button>
          </Link>
        </div>
      </div>

      {/* Flippy Card Section */}
      <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'>
        <div className="flippy-card">
          <div className="flippy-inner">
            <div className="flippy-front">
              <img src="./hero22.gif" alt="hero" className="w-full h-full object-cover rounded-2xl" />
            </div>
            <div className="flippy-back flex items-center justify-center p-6 bg-zinc-900 text-yellow-100 text-center rounded-2xl">
              <p className="text-lg md:text-xl font-medium leading-relaxed">
                “A reader lives a thousand lives before he dies.” — George R.R. Martin
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;
