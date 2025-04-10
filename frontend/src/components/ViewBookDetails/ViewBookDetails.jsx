import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
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

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleFavourite = () => {
    console.log("Add to Favourites clicked");
    // Implement the logic for adding to favourites
  };

  const handleEdit = () => {
    console.log("Edit clicked");
    // Implement the logic for editing the book details
  };

  const handleDelete = () => {
    console.log("Delete clicked");
    // Implement the logic for deleting the book
  };

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
          <div className="w-full lg:w-3/6 flex flex-col items-center relative">
            <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full flex flex-col items-center relative">
              <img
                src={data.url}
                alt={data.title || "Book image"}
                className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded object-cover"
              />
              {isLoggedIn && role === "user" && (
                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">
                  <button
                    className="bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 text-red-500 flex items-center justify-center"
                    onClick={handleFavourite}
                  >
                    <FaHeart />
                    <span className="ms-4 block lg:hidden">Favourites</span>
                  </button>
                  <button className="text-white rounded mt-8 md:mt-0 lg:rounded-full text-4xl lg:text-3xl p-3 lg:mt-8 bg-blue-500 flex items-center justify-center">
                    <FaShoppingCart />
                    <span className="ms-4 block lg:hidden">Add to cart</span>
                  </button>
                </div>
              )}
              {isLoggedIn && role === "admin" && (
                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">
                  <button
                    className="bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 flex items-center justify-center"
                    onClick={handleEdit}
                  >
                    <FaEdit />
                    <span className="ms-4 block lg:hidden">Edit</span>
                  </button>
                  <button
                    className="text-red-500 rounded lg:rounded-full text-4xl lg:text-3xl p-3 mt-8 md:mt-0 lg:mt-8 bg-white flex items-center justify-center"
                    onClick={handleDelete}
                  >
                    <MdOutlineDelete />
                    <span className="ms-4 block lg:hidden">Delete Book</span>
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
            <p className="text-zinc-500 mt-4 text-xl leading-relaxed">
              {data.desc}
            </p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="mr-3" /> {data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price:{" "}
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(data.price)}
            </p>
          </div>
        </div>
      )}
      {!data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <p className="text-zinc-400 text-xl">No data available</p>
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;