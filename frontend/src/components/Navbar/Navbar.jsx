import React from 'react';
import { Link } from 'react-router-dom';

const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
];

const Navbar = () => {
    return (
        <>
        <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
            <Link to="/" className="flex items-center">
                <img
                    className="h-10 mr-4"
                    src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
                    alt="Quasar Books Logo"
                />
                <h1 className="text-2xl font-semibold">Quasar Books</h1>
            </Link>
            <div className="nav-links-bookheavan block md:flex items-center gap-4">
                <div className="hidden md:flex gap-4">
                    {links.map((item) => (
                        <Link
                            to={item.link}
                            className="hover:text-blue-500 transition-all duration-300"
                            key={item.title}
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
                <div className="hidden md:flex gap-4">
                    <Link
                        to="/LogIn"
                        className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                    >
                        LogIn
                    </Link>
                    <Link
                        to="/SignUp"
                        className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                    >
                        SignUp
                    </Link>
                </div>
                <button className='text-white text-2x1 hover:text-zinc-400'>
                    <FaGriplLines/>
                </button>
            </div>
        </nav>
        <div className='bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justtify-center '>
        {links.map((item) => (
                        <Link
                            to={item.link}
                            className="text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300"
                            key={item.title}
                        >
                            {item.title}
                        </Link>
                    ))}
                    
                    <Link
                        to="/LogIn"
                        className="px-8 mb-8text-4xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
                    >
                        LogIn
                    </Link>
                    <Link
                        to="/SignUp"
                        className="px-8 mb-8 text-4xl font-semibold py-2  bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                    >
                        SignUp
                    </Link>
                
        </div>
        </>
    );
};

export default Navbar;