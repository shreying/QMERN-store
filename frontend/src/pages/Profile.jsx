import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Sidebar from "../components/Profile/Sidebar"; // Adjust the path if needed
import { Outlet } from "react-router-dom";
import Loader from "../components/Loader/Loader"; // Import Loader if not already imported

const Profile = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [profile, setProfile] = useState(null); // Initialize profile state
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          { headers }
        );
        setProfile(response.data); // Update profile state with fetched data
      } catch (error) {
        console.error("Error fetching user information:", error);
        if (error.response && error.response.status === 403) {
          alert("You are not authorized to access this resource. Please log in again.");
          localStorage.clear(); // Clear invalid token
          window.location.href = "/login"; // Redirect to login page
        }
      }
    };

    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4 text-white">
      {!profile && 
      <div className="w-full h-[100%] flex justify-center items-center ">
        <Loader />
      </div>} 
      {profile && (
        <>
          <div className="w-full md:w-1/6">
            <Sidebar data={profile} /> 
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;