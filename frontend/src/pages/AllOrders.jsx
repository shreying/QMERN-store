import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState(null); // State to store all orders
  const [loading, setLoading] = useState(true); // State to manage loader

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-orders",
          { headers }
        );
        setAllOrders(response.data.data); // Set orders in state
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
      } finally {
        setLoading(false); // Stop loader
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="h-[100vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-[100%] p-4 md:p-8 bg-gray-900 text-gray-100">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-300 mb-8 text-center">
        All Orders
      </h1>
      {allOrders && allOrders.length > 0 ? (
        <div className="space-y-6">
          {allOrders.map((order, index) => (
            <div
              key={order._id}
              className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-400">Order #{index + 1}</p>
                <p className="text-lg font-semibold text-gray-200">
                  Books: {Array.isArray(order.books) ? order.books.join(", ") : "No books"}
                </p>
                <p className="text-sm text-gray-400">
                  Description: {order.description || "No description"}
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <p className="text-lg font-semibold text-green-400">
                  ₹{order.totalPrice || "N/A"}
                </p>
                <p
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    order.status === "Delivered"
                      ? "bg-green-500 text-white"
                      : order.status === "Pending"
                      ? "bg-yellow-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {order.status || "Unknown"}
                </p>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition-all">
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No orders found.</p>
      )}
    </div>
  );
};

export default AllOrders;
