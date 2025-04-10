import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const [address, setAddress] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          { headers }
        );
        setProfileData(response.data);
        setAddress(response.data.address);
      } catch (error) {
        console.error("Error fetching user information:", error);
        toast.error("Failed to fetch user information.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInformation();
  }, []);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/update-address",
        { address },
        { headers }
      );
      toast.success("Address updated successfully!");
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Failed to update address.");
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-zinc-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-[100%] p-6 md:p-12 text-zinc-100">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Settings
      </h1>
      <div className="flex flex-col gap-8">
        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-lg font-semibold">
            Username
          </label>
          <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
            {profileData?.username || "N/A"}
          </p>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-lg font-semibold">
            Email
          </label>
          <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
            {profileData?.email || "N/A"}
          </p>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-lg font-semibold">
            Address
          </label>
          <textarea
            name="address"
            className="p-2 rounded bg-zinc-800 mt-2 font-semibold w-full"
            rows="5"
            value={address}
            onChange={handleAddressChange}
          />
        </div>

        {/* Save Button */}
        <div className="mt-4 flex justify-end">
          <button
            className="bg-yellow-500 text-zinc-900 font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition"
            onClick={handleSave}
          >
            Update Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;