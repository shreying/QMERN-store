import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { Link } from "react-router-dom";
import { FaCheck, FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SeeUserData from "../pages/SeeUserData";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [userDiv, setUserDiv] = useState(false);
  const [userDivData, setUserDivData] = useState(null);

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
        setAllOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatus((prev) => ({ ...prev, [orderId]: newStatus }));
  };

  const updateStatus = async (orderId) => {
    try {
      const newStatus = selectedStatus[orderId];
      await axios.put(
        `http://localhost:1000/api/v1/update-order-status/${orderId}`,
        { status: newStatus },
        { headers }
      );
      setAllOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      setSelectedStatus((prev) => {
        const updated = { ...prev };
        delete updated[orderId];
        return updated;
      });
      toast.success(`Order status updated to "${newStatus}"!`);
    } catch (error) {
      console.error("Error updating order status:", error.response?.data || error.message);
      toast.error("Failed to update order status.");
    }
  };

  const handleUserClick = (user) => {
    setUserDivData(user);
    setUserDiv(true);
  };

  if (loading) {
    return (
      <div className="h-[100vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-[100%] p-4 md:p-8 bg-zinc-900 text-zinc-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8 text-center">
        All Orders
      </h1>

      {userDiv && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setUserDiv={setUserDiv}
        />
      )}

      {allOrders && allOrders.length > 0 ? (
        <>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[10%]">
              <h1>Book</h1>
            </div>
            <div className="w-[30%] md:w-[22%]">
              <h1>Title</h1>
            </div>
            <div className="w-0 md:w-[30%] hidden md:block">
              <h1>User</h1>
            </div>
            <div className="w-[17%] md:w-[9%]">
              <h1>Price</h1>
            </div>
            <div className="w-[30%] md:w-[16%]">
              <h1>Status</h1>
            </div>
          </div>

          <div className="space-y-4 mt-4">
            {allOrders
              .filter((order) => order.book) // Filter out orders with deleted books
              .map((order, index) => (
                <div
                  key={order._id}
                  className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 items-center hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300"
                >
                  {/* Serial Number */}
                  <div className="w-[3%]">
                    <p className="text-center">{index + 1}</p>
                  </div>

                  {/* Book Image */}
                  <div className="w-[10%]">
                    <img
                      src={order.book.url || "/placeholder.png"} // Use placeholder if URL is missing
                      alt={order.book.title || "Book Image"} // Fallback alt text
                      className="h-12 w-12 object-cover rounded"
                    />
                  </div>

                  {/* Book Title */}
                  <div className="w-[30%] md:w-[22%]">
                    <Link
                      to={`/view-book-details/${order.book._id}`}
                      className="hover:text-blue-300"
                    >
                      {order.book.title}
                    </Link>
                  </div>

                  {/* User Info */}
                  <div className="w-0 md:w-[30%] hidden md:block">
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => handleUserClick(order.user)}
                    >
                      <FaUser className="text-blue-400" />
                      <p>{order.user.name}</p>
                    </div>
                  </div>

                  {/* Book Price */}
                  <div className="w-[17%] md:w-[9%]">
                    <p>₹{order.book.price}</p>
                  </div>

                  {/* Order Status */}
                  <div className="w-[30%] md:w-[16%] flex flex-col gap-2">
                    <p
                      className={`text-sm font-medium px-3 py-1 rounded-full ${
                        order.status === "Order Delivered"
                          ? "bg-green-500 text-white"
                          : order.status === "Order Shipped"
                          ? "bg-yellow-500 text-white"
                          : order.status === "Order Placed"
                          ? "bg-blue-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {order.status}
                    </p>

                    {/* Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <select
                        name="status"
                        className="bg-gray-800 text-white rounded px-2 py-1"
                        value={selectedStatus[order._id] || order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      >
                        {["Order Placed", "Order Shipped", "Order Delivered", "Canceled"].map(
                          (status, i) => (
                            <option key={i} value={status}>
                              {status}
                            </option>
                          )
                        )}
                      </select>
                      <button
                        onClick={() => updateStatus(order._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-full transition-all duration-300"
                      >
                        <FaCheck />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : (
        <p className="text-center text-zinc-400">No orders found.</p>
      )}
    </div>
  );
};

export default AllOrders;
