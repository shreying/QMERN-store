import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookCard = ({ data, favourite, handleRemoveBook }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleRemoveBookFromFavourites = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/remove-book-from-favourite",
        { bookId: data._id },
        { headers }
      );
      toast.success(response.data.message); // Show success toast
      if (handleRemoveBook) {
        handleRemoveBook(data._id);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to remove book from favourites."
      ); // Show error toast
    }
  };

  return (
    <>
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Card */}
      <div
        className="relative bg-zinc-800 rounded-xl p-4 shadow-md hover:shadow-lg transition cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Book Cover */}
        <div className="bg-zinc-900 rounded-xl overflow-hidden h-64 mb-3 relative">
          <img
            src={data.url || "/placeholder.png"}
            alt={data.title}
            className="w-full h-full object-cover"
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-60 p-4 text-yellow-100">
              <h3 className="text-lg font-semibold">{data.title}</h3>
              <p className="text-sm">Author: {data.author}</p>
              <p className="text-sm">Year: {data.published}</p>
              <p className="text-sm">₹ {data.price}</p>
              <p className="text-xs mt-2 italic">Click to view more</p>
            </div>
          )}
        </div>

        {/* Text Preview */}
        <h3 className="text-yellow-100 text-lg font-semibold">{data.title}</h3>
        <p className="text-zinc-400 text-sm">by {data.author}</p>
        <p className="text-zinc-400 font-semibold">₹ {data.price}</p>

        {favourite && (
          <button
            className="bg-yellow-600 px-4 py-2 rounded border border-yellow-700 text-black mt-4 hover:bg-yellow-700 transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveBookFromFavourites();
            }}
          >
            Remove from Favourites
          </button>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-zinc-950 text-yellow-100 rounded-xl p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={data.url || "/placeholder.png"}
              alt={data.title}
              className="w-full h-56 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
            <p className="mb-1"><strong>Author:</strong> {data.author}</p>
            <p className="mb-1"><strong>Published:</strong> {data.published}</p>
            <p className="mb-1"><strong>Price:</strong> ₹ {data.price}</p>
            <p className="mb-3"><strong>Description:</strong> {data.description || "No description provided."}</p>

            <div className="flex flex-col gap-2">
              <Link
                to={`/view-book-details/${data._id}`}
                className="text-center bg-yellow-500 text-black rounded px-4 py-2 hover:bg-yellow-400 transition"
              >
                View Full Details
              </Link>
              {favourite && (
                <button
                  onClick={() => {
                    handleRemoveBookFromFavourites();
                    setIsModalOpen(false);
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition"
                >
                  Remove from Favourites
                </button>
              )}
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-3 text-xl text-yellow-400 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;