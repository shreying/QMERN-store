import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateBook = () => {
  const { id } = useParams(); // Get book ID from URL
  const navigate = useNavigate();
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "", // Initialize as an empty string
    language: "",
  });
  const [loading, setLoading] = useState(true); // Loader state

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-book-by-id/${id}`,
          { headers }
        );
        setData({
          url: response.data.data.url,
          title: response.data.data.title,
          author: response.data.data.author,
          price: response.data.data.price,
          desc: response.data.data.description, // Ensure this is correct
          language: response.data.data.language,
        });
      } catch (error) {
        console.error("Error fetching book details:", error.response?.data || error.message);
        toast.error("Failed to fetch book details.");
        navigate(`/view-book-details/${id}`); // Redirect to view book details page on error
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const change = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name}: ${value}`); // Debugging
    setData({ ...Data, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!Data.url || !Data.title || !Data.author || !Data.price || !Data.desc || !Data.language) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/update-book/${id}`,
        Data,
        { headers }
      );
      toast.success("Book updated successfully!");
      navigate(`/view-book-details/${id}`); // Redirect to the updated book's details page
    } catch (error) {
      console.error("Error updating book:", error.response?.data || error.message);
      toast.error("Failed to update book. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-900">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 h-auto px-12 py-8">
      {/* Toastify Container */}
      <ToastContainer position="top-right" autoClose={3000} />
      <h4 className="text-3xl text-yellow-100 font-bold my-8">Update Book</h4>
      <form onSubmit={submit} className="space-y-6">
        <div>
          <label className="block text-yellow-100 font-semibold mb-2">Image URL</label>
          <input
            type="text"
            name="url"
            value={Data.url}
            onChange={change}
            className="w-full p-2 rounded bg-zinc-800 text-yellow-100"
            required
          />
        </div>
        <div>
          <label className="block text-yellow-100 font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={Data.title}
            onChange={change}
            className="w-full p-2 rounded bg-zinc-800 text-yellow-100"
            required
          />
        </div>
        <div>
          <label className="block text-yellow-100 font-semibold mb-2">Author</label>
          <input
            type="text"
            name="author"
            value={Data.author}
            onChange={change}
            className="w-full p-2 rounded bg-zinc-800 text-yellow-100"
            required
          />
        </div>
        <div>
          <label className="block text-yellow-100 font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={Data.price}
            onChange={change}
            className="w-full p-2 rounded bg-zinc-800 text-yellow-100"
            required
          />
        </div>
        <div>
          <label className="block text-yellow-100 font-semibold mb-2">Description</label>
          <textarea
            name="desc" // Ensure this matches the key in the state
            value={Data.desc}
            onChange={change}
            className="w-full p-2 rounded bg-zinc-800 text-yellow-100"
            rows="5"
            required
            autoComplete="off"
          ></textarea>
        </div>
        <div>
          <label className="block text-yellow-100 font-semibold mb-2">Language</label>
          <input
            type="text"
            name="language"
            value={Data.language}
            onChange={change}
            className="w-full p-2 rounded bg-zinc-800 text-yellow-100"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-500 text-zinc-900 font-semibold px-6 py-2 rounded hover:bg-yellow-600 transition-all"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;