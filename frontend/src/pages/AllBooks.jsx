import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard/BookCard";
import Loader from "../components/Loader/Loader";
import axios from "axios";

const AllBooks = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-book");
        const books = response.data.data; // Assuming the response structure is correct
        console.log(books); // Log the entire array of books

        // Log each book's details
        books.forEach((book) => {
          console.log(
            `Title: ${book.title}, Author: ${book.author}, Published: ${book.published}, Price: ${book.price}, URL: ${book.url}`
          );
        });

        setData(books); // Update state with the fetched books
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-zinc-900 h-auto px-12 py-8">
      <h4 className="text-3xl text-yellow-100 font-bold my-8">All Books</h4>
      {!data.length && (
        <div className="flex items-center justify-center my-8">
          <Loader /> {/* Show loader if data is not available */}
        </div>
      )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data.length > 0 ? (
          data.map((book, index) => (
            <div key={index}>
              <BookCard data={book} />
            </div>
          ))
        ) : (
          <p className="text-yellow-100">No books available.</p>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
