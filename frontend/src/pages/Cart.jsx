import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1000/api/v1/get-user-cart",
          { headers }
        );
        setCart(res.data.data);

        // Calculate total price
        const totalPrice = res.data.data.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        setTotal(totalPrice);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, []);

  const deleteItem = async (bookId) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/remove-from-cart/${bookId}`,
        {},
        { headers }
      );
      alert(response.data.message);

      // Update cart state
      const updatedCart = cart.filter((item) => item.id !== bookId);
      setCart(updatedCart);

      // Recalculate total price
      const updatedTotal = updatedCart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotal(updatedTotal);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  if (!cart) {
    return <Loader />;
  }

  return (
    <div className="bg-zinc-900 px-12 h-screen py-8">
      {cart.length === 0 ? (
        <div className="h-[100%] flex items-center justify-center flex-col">
          <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
            Empty Cart
          </h1>
          <img
            src="/empty-cart.png"
            alt="empty cart"
            className="lg:h-[50vh]"
          />
        </div>
      ) : (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            Your Cart
          </h1>
          {cart.map((item, i) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
              key={i}
            >
              <img
                src={item.url}
                alt={item.title}
                className="h-[20vh] md:h-[10vh] object-cover"
              />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                  {item.title}
                </h1>
                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                  {(item.desc || "").slice(0, 100)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                  {(item.desc || "").slice(0, 65)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                  {(item.desc || "").slice(0, 40)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2">
                  Price: {item.price} Rs
                </p>
                <p className="text-normal text-zinc-300 mt-2">
                  Quantity: {item.quantity}
                </p>
              </div>
              <button
                className="text-red-500 hover:text-red-700 mt-4 md:mt-0"
                onClick={() => deleteItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-8">
            <h2 className="text-3xl font-semibold text-zinc-500">
              Total: {total} Rs
            </h2>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;