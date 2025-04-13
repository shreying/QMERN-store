import React from 'react';
import { Link } from 'react-router-dom';
import '/src/assets/flippy.css'; // Ensure this file exists in your project

const Hero = () => {
  return (
    <div className="md:h-[75vh] flex flex-col md:flex-row items-center justify-center px-4 lg:px-12 bg-gradient-to-b from-zinc-900 to-zinc-800 overflow-hidden">

      {/* Text Section */}
      <div className="w-full mb-12 lg:w-3/6 flex flex-col items-center lg:items-start justify-center z-10">
        <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left tracking-wide leading-snug" style={{ fontFamily: 'serif' }}>
          Welcome to <br />The Moonlit Shelf
        </h1>
        <p className="mt-4 text-xl text-zinc-300 text-center lg:text-left italic max-w-xl" style={{ fontFamily: 'serif' }}>
          Here, stories drift like clouds, and every book is a doorway to dreams.  
          Come, wander between the shelves — the night is young, and the tales endless.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center lg:items-start">
          <Link to="/all-books">
            <button className="text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 rounded-full transition-transform duration-300 hover:scale-110 hover:bg-yellow-100 hover:text-zinc-900 shadow-md hover:shadow-yellow-200/40">
              Discover Books
            </button>
          </Link>
        </div>
      </div>

      {/* Flippy Card Section */}
      <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center z-10">
        <div className="flippy-card transition-transform duration-300 hover:scale-105">
          <div className="flippy-inner">
            <div className="flippy-front">
              <img
                src="./hero22.gif"
                alt="hero"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div className="flippy-back flex items-center justify-center p-6 bg-zinc-900 text-yellow-100 text-center rounded-2xl shadow-lg">
              <p className="text-lg md:text-xl font-medium leading-relaxed italic" style={{ fontFamily: 'serif' }}>
                “A reader lives a thousand lives before he dies.” <br /> — George R.R. Martin
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;
