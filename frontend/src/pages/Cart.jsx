import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        "http://localhost:1000/api/v1/get-user-cart",
        { headers }
      );
      setCart(res.data.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      toast.error("Failed to fetch cart data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Recalculate total price and total quantity whenever the cart changes
  useEffect(() => {
    if (cart && cart.length) {
      let total = 0;
      let quantity = 0;
      cart.forEach((item) => {
        const itemQuantity = Number(item.quantity) || 1; // Default to 1 if undefined
        const itemPrice = Number(item.price) || 0;
        total += itemPrice * itemQuantity;
        quantity += itemQuantity;
      });
      setTotal(total);
      setTotalQuantity(quantity);
    }
  }, [cart]);

  const deleteItem = async (bookId) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/remove-from-cart/${bookId}`,
        {},
        { headers }
      );
      toast.success(response.data.message);

      // Update cart
      const updatedCart = cart.filter((item) => item._id !== bookId);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error(
        error.response?.data?.message || "Failed to remove item from cart."
      );
    }
  };

  const placeOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/place-order",
        {
          order: cart, // Only send the order array
        },
        { headers }
      );
      toast.success(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(
        error.response?.data?.message || "Failed to place order."
      );
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
    <div className="bg-zinc-900 px-6 md:px-12 py-8 min-h-screen">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {cart.length === 0 ? (
        <div className="h-full flex items-center justify-center flex-col">
          <h1 className="text-4xl lg:text-5xl font-semibold text-zinc-400 mb-6">
            Your Cart is Empty
          </h1>
          <img
            src="/shopping.png" // Updated image path
            alt="empty cart"
            className="lg:h-[50vh] h-[30vh] object-contain"
          />
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-zinc-100 mb-8">Your Cart</h1>
          <div className="space-y-6">
            {cart.map((item, i) => (
              <div
                className="w-full rounded-lg flex flex-col md:flex-row p-6 bg-zinc-800 shadow-md items-center gap-6"
                key={i}
              >
                {/* Book Image */}
                <img
                  src={item.url}
                  alt={item.title}
                  className="h-[20vh] md:h-[15vh] w-auto object-cover rounded-lg"
                />

                {/* Book Details */}
                <div className="flex-1">
                  <h1 className="text-2xl text-zinc-100 font-semibold">
                    {item.title}
                  </h1>
                  <p className="text-sm text-zinc-400 mt-2 hidden lg:block">
                    {(item.desc || "").slice(0, 100)}...
                  </p>
                  <p className="text-lg text-zinc-300 mt-2">
                    Price: <span className="font-bold">{item.price} Rs</span>
                  </p>
                  <p className="text-lg text-zinc-300 mt-2">
                    Quantity: <span className="font-bold">{item.quantity}</span>
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  className="text-red-500 hover:text-red-700 font-semibold text-lg"
                  onClick={() => deleteItem(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total Section */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-zinc-800 p-6 rounded-lg shadow-md">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-zinc-100">
                Total Quantity: <span className="text-blue-400">{totalQuantity}</span>
              </h2>
              <h2 className="text-2xl font-bold text-zinc-100 mt-2">
                Total Price: <span className="text-blue-400">{total} Rs</span>
              </h2>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
              onClick={placeOrder}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;