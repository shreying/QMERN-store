import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookCard = ({ data, favourite, handleRemoveBook }) => {
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
      alert(response.data.message); // Show success message
      if (handleRemoveBook) {
        handleRemoveBook(data._id); // Call parent handler if provided
      }
    } catch (error) {
      console.error("Error removing book from favourites:", error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col hover:shadow-lg transition-shadow duration-300">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-zinc-900 rounded overflow-hidden mb-4">
          <img
            src={data.url || "/placeholder.png"} // Fallback to placeholder if no image URL
            alt={data.title}
            className="w-full h-48 object-cover"
          />
        </div>
        <h3 className="text-yellow-100 text-lg font-semibold">{data.title}</h3>
        <p className="text-zinc-400 text-sm">by {data.author}</p>
        <p className="text-zinc-400 font-semibold">{data.price} Rs</p>
      </Link>
      {favourite && (
        <button
          className="bg-yellow-600 px-4 py-2 rounded border border-yellow-700 text-black mt-4 hover:bg-yellow-700 transition-colors duration-300"
          onClick={handleRemoveBookFromFavourites}
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;