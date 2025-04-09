import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Sidebar from "../components/Profile/Sidebar"; // Adjust the path if needed
import { Outlet } from "react-router-dom";

const Profile = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",{ headers }
        );
        console.log("User Information:", response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4 text-white">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;