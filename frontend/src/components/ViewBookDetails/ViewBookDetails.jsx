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
    useSelector((state) => state.auth.role) || localStorage.getItem("role");

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
        <div className="px-4 md:px-12 py-10 bg-zinc-900 flex flex-col md:flex-row gap-10 items-start">
          {/* Image & Action Buttons */}
          <div className="w-full md:w-1/3 flex flex-col items-center gap-6">
            <div className="bg-zinc-800 p-6 rounded-xl shadow-md w-full flex justify-center">
              <img
                src={data.url}
                alt={data.title}
                className="rounded-lg h-[60vh] object-cover shadow"
              />
            </div>

            {isLoggedIn && role === "user" && (
              <div className="flex gap-4 w-full justify-center lg:flex-col items-center">
                <button
                  className="bg-white hover:bg-zinc-200 transition text-red-500 text-2xl p-3 px-5 rounded-full flex items-center gap-3 shadow-sm"
                  title="Add to Favorites"
                >
                  <FaHeart />
                  <span className="hidden lg:inline text-sm font-medium text-zinc-700">
                    Favourites
                  </span>
                </button>
                <button
                  className="bg-white hover:bg-zinc-200 transition text-blue-500 text-2xl p-3 px-5 rounded-full flex items-center gap-3 shadow-sm"
                  title="Add to Cart"
                >
                  <FaShoppingCart />
                  <span className="hidden lg:inline text-sm font-medium text-zinc-700">
                    Add to Cart
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Book Details */}
          <div className="w-full md:w-2/3 text-zinc-100 space-y-4">
            <h1 className="text-4xl font-bold text-zinc-200">{data.title}</h1>
            <p className="text-zinc-400 text-lg">by {data.author}</p>
            <p className="text-zinc-400">{data.desc || data.description}</p>

            <p className="flex items-center gap-2 text-zinc-400 pt-2">
              <GrLanguage className="text-lg" />
              {data.language}
            </p>

            <p className="text-2xl font-semibold pt-4">
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
