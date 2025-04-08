import React, { useEffect, useState } from "react";
import axios from "axios";

const RecentlyAdded = () => {
  const [Data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-recent-books"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-yellow-100">Recently added books</h4>
      <div className="my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4"></div>
      {Data &&
        Data.map((item,i) =>  (
          <div
            key={item._id}
            className="bg-zinc-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={item.coverImage}
              alt={item.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h5 className="text-xl text-yellow-100">{item.title}</h5>
            <p className="text-zinc-300">{item.author}</p>
            <p className="text-zinc-400">{item.description}</p>
          </div>
        ))}
    </div>
    
  );
};

export default RecentlyAdded;