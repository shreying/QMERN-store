import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const isLoggedIn =
    useSelector((state) => state.auth.isLoggedIn) ||
    localStorage.getItem("isLoggedIn") === "true";

  const role =
    useSelector((state) => state.auth.role) ||
    localStorage.getItem("role");

  console.log("🔥 ViewBookDetails rendering...");
  console.log("✨ isLoggedIn:", isLoggedIn);
  console.log("👑 role:", role, typeof role);
  console.log("Condition:", isLoggedIn === true && role === "user");
  console.log("Token:", localStorage.getItem("token"));
  console.log("ID:", localStorage.getItem("id"));
  console.log("Role from LS:", localStorage.getItem("role"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen bg-zinc-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8 items-start">
          {/* Left Section: Image and Buttons */}
          <div className="w-full lg:w-3/6">
            <div className="flex justify-around bg-zinc-800 p-12 rounded">
              <img
                src={data.url}
                alt={data.title}
                className="h-[50vh] lg:h-[70vh] rounded object-cover"
              />
              {isLoggedIn === true && role === "user" && (
                <div className="flex md:flex-col">
                  <button
                    className="bg-white rounded-full text-3xl p-3 text-red-500 shadow-md hover:bg-zinc-200 transition-all"
                    title="Add to Favorites"
                    aria-label="Add to Favorites"
                  >
                    <FaHeart />
                  </button>
                  <button
                    className="bg-white rounded-full text-3xl p-3 mt-8 text-blue-500 shadow-md hover:bg-zinc-200 transition-all"
                    title="Add to Cart"
                    aria-label="Add to Cart"
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Section: Book Details */}
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {data.title}
            </h1>
            <p className="text-zinc-400 mt-1">by {data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="mr-3" /> {data.language}
            </p>
            <p className="text-2xl font-semibold text-zinc-100 mt-4">
              Price:{" "}
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(data.price)}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;

