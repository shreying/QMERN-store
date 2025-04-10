import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-favourite-books",
          { headers }
        );
        setFavouriteBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching favourite books:", error.response?.data || error.message);
      }
    };

    fetch();
  }, []); // Empty dependency array to fetch only once on component mount

  const handleRemoveBook = (bookId) => {
    setFavouriteBooks((prevBooks) =>
      prevBooks.filter((book) => book._id !== bookId)
    );
  };

  return (
    <>
      {favouriteBooks.length === 0 ? (
        <div className="text-5xl font-semibold h-[100vh] text-zinc-500 flex items-center justify-center w-full bg-zinc-900">
          No Favourite Books
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 p-6 bg-zinc-900">
          {favouriteBooks.map((items, i) => (
            <div key={i}>
              <BookCard
                data={items}
                favourite={true}
                handleRemoveBook={handleRemoveBook} // Pass the handler to BookCard
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Favourites;