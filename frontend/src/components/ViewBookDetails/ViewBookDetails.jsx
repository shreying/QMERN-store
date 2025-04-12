import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const isLoggedIn =
    useSelector((state) => state.auth.isLoggedIn) ||
    localStorage.getItem("isLoggedIn") === "true";

  const role =
    useSelector((state) => state.auth.role) || localStorage.getItem("role");

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookId: id,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-book-by-id/${id}`,
          { headers }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  const handleFavourite = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-book-to-favourite",
        {},
        { headers }
      );
      toast.success(response.data.message); // Show success toast
      console.log("Added to Favourites:", response.data.message);
    } catch (error) {
      console.error("Error adding to favourites:", error.response?.data || error.message);
      toast.error("Failed to add to favourites. Please try again."); // Show error toast
    }
  };

  const deleteBook = async () => {
    try {
        const response = await axios.delete(
            `http://localhost:1000/api/v1/delete-book/${id}`, // Pass book ID in URL
            { headers } // Include headers for authentication
        );
        console.log(response.data); // Log the response
        toast.success("Book deleted successfully!"); // Show success toast
        navigate("/all-books"); // Redirect to home page after deletion
    } catch (error) {
        console.error("Error deleting book:", error.response?.data || error.message);
        toast.error("Failed to delete the book. Please try again."); // Show error toast
    }
};

  const handleCart = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-to-cart",
        {},
        { headers }
      );
      toast.success(response.data.message); // Show success toast
      console.log("Added to Cart:", response.data.message);
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
      toast.error("Failed to add to cart. Please try again."); // Show error toast
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
    <>
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start">
          {/* Image & Action Buttons */}
          <div className="w-full md:w-1/3 flex flex-col items-center gap-6">
            <div className="bg-zinc-800 p-6 rounded-xl shadow-md w-full flex justify-center">
              <img
                src={data.url}
                alt={data.title}
                className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded"
              />
            </div>

            {isLoggedIn && role === "user" && (
              <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 gap-4">
                <button
                  className="bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 text-red-500 flex items-center gap-3"
                  onClick={handleFavourite}
                >
                  <FaHeart />
                  <span className="ms-4 block lg:hidden">Favourites</span>
                </button>
                <button
                  className="bg-white text-blue-500 rounded mt-8 md:mt-0 lg:rounded-full text-4xl lg:text-3xl p-3 flex items-center gap-3"
                  onClick={handleCart}
                >
                  <FaShoppingCart />
                  <span className="ms-4 block lg:hidden">Add to Cart</span>
                </button>
              </div>
            )}

            {isLoggedIn && role === "admin" && (
              <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8">
                <Link
                  to={`/update-book/${id}`} // Link to the update book page
                  className="bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 flex items-center justify-center"
                >
                  <FaEdit />
                  <span className="ms-4 block lg:hidden">Edit</span>
                </Link>
                <button
                  className="text-red-500 rounded lg:rounded-full text-4xl lg:text-3xl p-3 mt-8 md:mt-0 lg:mt-8 flex items-center justify-center"
                  onClick={deleteBook} // Call deleteBook function on click
                >
                  <MdOutlineDelete />
                  <span className="ms-4 block lg:hidden">Delete Book</span>
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
