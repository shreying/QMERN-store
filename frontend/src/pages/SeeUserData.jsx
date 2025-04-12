import React from "react";
import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({ userDivData, userDiv, setUserDiv }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`${
          userDiv ? "fixed" : "hidden"
        } top-0 left-0 h-screen w-full bg-black opacity-50 z-40`}
      ></div>

      {/* Popup */}
      <div
        className={`${
          userDiv ? "fixed" : "hidden"
        } top-0 left-0 h-screen w-full flex items-center justify-center z-50`}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] md:w-[50%] lg:w-[40%]">
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-3">
            <h1 className="text-2xl font-semibold text-gray-800">
              User Information
            </h1>
            <button
              onClick={() => setUserDiv(false)}
              className="text-gray-500 hover:text-gray-800 transition"
            >
              <RxCross1 size={24} />
            </button>
          </div>

          {/* User Details */}
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-gray-600">
                <span className="font-semibold">Username:</span>{" "}
                {userDivData.username}
              </label>
            </div>
            <div>
              <label className="text-gray-600">
                <span className="font-semibold">Email:</span>{" "}
                {userDivData.email}
              </label>
            </div>
            
            <div>
              <label className="text-gray-600">
                <span className="font-semibold">Address:</span>{" "}
                {userDivData.address || "N/A"}
              </label>
            </div>
          </div>

          {/* Close Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setUserDiv(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeUserData;