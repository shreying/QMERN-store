import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ data }) => {
  console.log(data);
  return (
    <Link to={`/book/${data._id}`}>
      <div className="bg-zinc-800 rounded p-4 hover:shadow-lg transition-shadow duration-300">
        <div className="bg-zinc-900 rounded overflow-hidden mb-4">
          <img
            src={data.url || "/placeholder.png"} // Fallback to placeholder if no image URL
            alt={data.title}
            className="w-full h-48 object-cover"
          />
        </div>
        <h3 className="text-yellow-100 text-lg font-semibold">{data.title}</h3>
        <p className="text-zinc-400 text-sm">{data.author}</p>
        <p className="text-zinc-400 font-semibold">{data.price} Rs</p>
      </div>
    </Link>
  );
};

export default BookCard;