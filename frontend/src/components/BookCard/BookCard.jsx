import React, { useState } from "react";
import { Link } from "react-router-dom";

const BookCard = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Book Card */}
      <div
        className="relative group cursor-pointer transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="rounded-xl overflow-hidden shadow-lg bg-zinc-800 h-64 transition-all duration-500 ease-in-out">
          <img
            src={data.url || "/placeholder.png"}
            alt={data.title}
            className="w-full h-full object-cover"
          />

          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-60 p-4 text-yellow-100 transition-opacity duration-300">
              <h3 className="text-xl font-semibold">{data.title}</h3>
              <p className="text-sm">Author: {data.author}</p>
              <p className="text-sm">Year: {data.published}</p>
              <p className="text-sm">₹ {data.price}</p>
              <p className="text-xs mt-2 italic">Click to view</p>
            </div>
          )}
        </div>
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
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
            <p className="mb-1">
              <strong>Author:</strong> {data.author}
            </p>
            <p className="mb-1">
              <strong>Published:</strong> {data.published}
            </p>
            <p className="mb-1">
              <strong>Price:</strong> ₹ {data.price}
            </p>
            <p className="mb-3">
              <strong>Description:</strong>{" "}
              {data.description || "No description provided."}
            </p>
            <Link
              to={`/view-book-details/${data._id}`}
              className="block text-center bg-yellow-500 text-black rounded px-4 py-2 hover:bg-yellow-400 transition"
            >
              View Full Details
            </Link>
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
