import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Get isLoggedIn from Redux
  const role = useSelector((state) => state.auth.role); // Get role from Redux
  const [MobileNav, setMobileNav] = useState("hidden");

  // Define navigation links
  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
    { title: "Admin Profile", link: "/profile" },
  ];

  // Remove "Cart" and "Profile" links if not logged in
  if (!isLoggedIn) {
    links.splice(2, 2); // Remove 2 items starting from index 2
  }

  // If logged in and role is admin, remove "Profile" link
  if (isLoggedIn && role === "admin") {
    links.splice(3, 1); // Remove "Profile" link at index 3
  }

  //If logged in and role is user
  if (isLoggedIn && role === "user") {
    links.splice(4, 1); // Remove "Admin Profile" link at index 4
  }
  // Toggle mobile nav visibility
  const toggleMobileNav = () => {
    setMobileNav((prev) => (prev === "hidden" ? "block" : "hidden"));
  };

  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img className="h-10 me-4" src="./logo.png" alt="logo" />
          <h1 className="text-2xl font-semibold">Quasar Books</h1>
        </Link>
        <div className="nav-links-qbooks hidden md:flex items-center gap-4">
          {links.map((item, i) => (
            <div className="flex items-center" key={i}>
              <Link
                to={item.link}
                className={`hover:text-blue-700 transition-all duration-300 ${
                  item.title === "Profile" || item.title =="Admin Profile" ? "hover:bg-white hover:text-zinc-800 hover:rounded-lg px-2 py-1" : ""
                }`}
              >
                {item.title}
              </Link>
            </div>
          ))}
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
        <button
          onClick={toggleMobileNav}
          className="md:hidden text-white text-2xl hover:text-zinc-400"
        >
          <FaGripLines />
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((item, i) => (
          <Link
            key={i}
            to={item.link}
            className="text-white text-4xl mb-8 font-semibold hover:text-blue-700 transition-all duration-300"
            onClick={toggleMobileNav}
          >
            {item.title}
          </Link>
        ))}
        {!isLoggedIn && (
          <>
            <Link
              to="/login"
              className="px-8 py-2 mb-8 text-3xl font-semibold border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
              onClick={toggleMobileNav}
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-8 py-2 mb-8 text-3xl font-semibold bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              onClick={toggleMobileNav}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
