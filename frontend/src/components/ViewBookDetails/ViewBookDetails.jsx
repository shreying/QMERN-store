import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen bg-zinc-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8">
          <div className="bg-zinc-800 rounded p-4 h-[65vh] lg:h-[88vh] w-full md:w-1/3 flex items-center justify-center">
            <img
              src={data.url}
              alt={data.title}
              className="h-[55vh] lg:h-[70vh] rounded object-cover"
            />
          </div>

          <div className="p-4 text-white w-full md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-200 mb-2">
              {data.title}
            </h1>
            <p className="text-zinc-400 mb-4 text-lg">by {data.author}</p>
            <p className="text-zinc-400 mb-4 text-base">
              {data.description || data.desc}
            </p>

            <p className="flex items-center text-zinc-400 text-base mb-4">
              <GrLanguage className="me-3" />
              {data.language}
            </p>

            <p className="text-2xl font-semibold text-zinc-100">
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
