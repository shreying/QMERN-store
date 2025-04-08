import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGriplines } from "react-icons/fa";

const Navbar = () => {
  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
  ];
  const [MobileNav, setMobileNav] = useState("hidden");

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
          <button
            className="block md:hidden text-white text-2xl hover:text-zinc-400"
            onClick={() =>
              MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")
            }
            aria-label="Toggle mobile menu"
            aria-expanded={MobileNav === "block"}
          >
            <FaGriplines />
          </button>
        </div>
      </nav>
      <div
        className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((item) => (
          <Link
            to={item.link}
            className="text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300"
            key={item.title}
            onClick={() => setMobileNav("hidden")}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navbar;