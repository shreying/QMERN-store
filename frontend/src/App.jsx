import React, { use } from 'react'
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import AllBooks from './pages/AllBooks';
import LogIn from './pages/Login';
import SignUp from './pages/SignUp'; // Import SignUp
import Cart from './pages/Cart'; // Import Cart
import Profile from './pages/Profile'; // Import Profile
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth'; // Import authActions
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if(
      localStorage.getItem("token") &&
      localStorage.getItem("id") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));

    }
  }, []);
  return (
    <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/all-books" element={<AllBooks />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/view-book-details/:id" element={<ViewBookDetails />} /> 
        </Routes>
        <Footer />
    </div>
  );
};

export default App