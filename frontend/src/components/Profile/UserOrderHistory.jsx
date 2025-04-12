import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-order-history",
          { headers }
        );
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-zinc-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 px-6 md:px-12 py-8 min-h-screen">
      <h1 className="text-4xl font-bold text-zinc-100 mb-8">Order History</h1>
      {orderHistory.length === 0 ? (
        <div className="h-full flex items-center justify-center flex-col">
          <img
            src="/no-orders.png" // Replace with the path to your "no orders" image
            alt="No orders found"
            className="lg:h-[50vh] h-[30vh] object-contain mb-6"
          />
          <h2 className="text-2xl text-zinc-400">No orders found.</h2>
        </div>
      ) : (
        <div className="space-y-6">
          {orderHistory.map((order, index) => (
            <div
              key={index}
              className="w-full rounded-lg p-6 bg-zinc-800 shadow-md flex flex-col md:flex-row items-center gap-6"
            >
              {/* Book Image */}
              <img
                src={order.book.url}
                alt={order.book.title}
                className="h-[20vh] md:h-[15vh] w-auto object-cover rounded-lg"
              />

              {/* Order Details */}
              <div className="flex-1">
                <h2 className="text-2xl text-zinc-100 font-semibold">
                  <Link
                    to={`/view-book-details/${order.book._id}`}
                    className="hover:underline hover:text-blue-400 transition"
                  >
                    {order.book.title}
                  </Link>
                </h2>
                <p className="text-sm text-zinc-400 mt-2">
                  Author: {order.book.author}
                </p>
                <p className="text-lg text-zinc-300 mt-2">
                  Price: <span className="font-bold">{order.book.price} Rs</span>
                </p>
                <p className="text-sm text-zinc-400 mt-2">
                  Ordered on:{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-sm text-zinc-400 mt-2">
                  Status:{" "}
                  <span
                    className={`font-bold ${
                      order.status === "Order Delivered"
                        ? "text-green-400"
                        : order.status === "Order Shipped"
                        ? "text-yellow-400"
                        : order.status === "Order Placed"
                        ? "text-blue-400"
                        : "text-red-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrderHistory;