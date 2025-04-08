import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { username, email, password, address } = values;

    if (!username || !email || !password || !address) {
      return alert("Please fill all the fields.");
    }

    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/sign-up",
        values
      );
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center px-6 py-8">
      <div className="bg-zinc-800 rounded-2xl shadow-lg px-10 py-8 w-full sm:max-w-md">
        <h2 className="text-3xl font-extrabold text-zinc-100 mb-6 text-center">
          Create Your Account
        </h2>

        {["username", "email", "password", "address"].map((field, idx) => (
          <div className="mb-5" key={idx}>
            <label
              htmlFor={field}
              className="block text-sm font-medium text-zinc-400 mb-2 capitalize"
            >
              {field}
            </label>
            <input
              type={field === "email" ? "email" : field === "password" ? "password" : "text"}
              id={field}
              name={field}
              placeholder={
                field === "email"
                  ? "you@example.com"
                  : field === "address"
                  ? "123 Main St, City"
                  : `Enter your ${field}`
              }
              value={values[field]}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-zinc-900 text-zinc-100 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
        >
          Sign Up
        </button>

        <div className="text-center mt-6">
          <p className="text-sm text-zinc-400">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:text-blue-500 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
