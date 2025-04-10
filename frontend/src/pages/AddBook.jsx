import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBook = () => {
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    description: "",
    language: "",
  });

  const [loading, setLoading] = useState(false);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/add-book",
        formData,
        { headers }
      );
      toast.success(response.data.message);
      setFormData({
        url: "",
        title: "",
        author: "",
        price: "",
        description: "",
        language: "",
      });
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error(
        error.response?.data?.message || "Failed to add book. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-5"
      >
        <h1 className="text-4xl font-bold text-slate-200 mb-6 text-center">Add a New Book</h1>

        {/* Image URL */}
        <div>
          <label className="text-slate-300 font-medium block mb-1">Image URL</label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
            className="w-full p-2 bg-transparent border border-slate-600 rounded text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-500 transition"
          />
        </div>

        {/* Title */}
        <div>
          <label className="text-slate-300 font-medium block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
            className="w-full p-2 bg-transparent border border-slate-600 rounded text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-500 transition"
          />
        </div>

        {/* Author */}
        <div>
          <label className="text-slate-300 font-medium block mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
            className="w-full p-2 bg-transparent border border-slate-600 rounded text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-500 transition"
          />
        </div>

        {/* Price */}
        <div>
          <label className="text-slate-300 font-medium block mb-1">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter book price"
            required
            className="w-full p-2 bg-transparent border border-slate-600 rounded text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-500 transition"
            min="0"
            step="0.01"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-slate-300 font-medium block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter book description"
            rows="4"
            required
            className="w-full p-2 bg-transparent border border-slate-600 rounded text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-500 transition"
          ></textarea>
        </div>

        {/* Language */}
        <div>
          <label className="text-slate-300 font-medium block mb-1">Language</label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            placeholder="Enter book language"
            required
            className="w-full p-2 bg-transparent border border-slate-600 rounded text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-500 transition"
          />
        </div>

        {/* Submit Button */}
        <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-black font-semibold transition duration-200 ${
                loading
                ? "bg-yellow-300 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-300"
            }`}
            >
            {loading ? "Adding..." : "Add Book"}
        </button>

      </form>
    </div>
  );
};

export default AddBook;
