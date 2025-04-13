import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false); // State for delete confirmation popup

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
    } catch (error) {
      console.error("Error adding to favourites:", error.response?.data || error.message);
      toast.error("Failed to add to favourites. Please try again."); // Show error toast
    }
  };

  const deleteBook = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:1000/api/v1/delete-book/${id}`,
        { headers }
      );
      toast.success("Book deleted successfully!"); // Show success toast
      navigate("/all-books"); // Redirect to all books page after deletion
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

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-[50%] lg:w-[30%] shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this book?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeletePopup(false)} // Close popup
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteBook(); // Call deleteBook function
                  setShowDeletePopup(false); // Close popup after deletion
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start">
          {/* Image & Action Buttons in the Same Box */}
          <div className="bg-zinc-800 p-6 rounded-xl shadow-md w-full md:w-1/3 flex flex-row items-start gap-6">
            {/* Book Image */}
            <div className="flex-1 flex justify-center">
              <img
                src={data.url}
                alt={data.title}
                className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 items-center justify-start">
              {isLoggedIn && role === "user" && (
                <>
                  <button
                    className="bg-white rounded-full text-3xl p-3 text-red-500 flex items-center justify-center shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-110"
                    onClick={handleFavourite}
                  >
                    <FaHeart />
                  </button>
                  <button
                    className="bg-white rounded-full text-3xl p-3 text-blue-500 flex items-center justify-center shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-110"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                  </button>
                </>
              )}

              {isLoggedIn && role === "admin" && (
                <>
                  <Link
                    to={`/update-book/${id}`}
                    className="bg-white rounded-full text-3xl p-3 text-green-500 flex items-center justify-center shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-110"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    className="bg-white rounded-full text-3xl p-3 text-red-500 flex items-center justify-center shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-110"
                    onClick={() => setShowDeletePopup(true)}
                  >
                    <MdOutlineDelete />
                  </button>
                </>
              )}
            </div>
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
