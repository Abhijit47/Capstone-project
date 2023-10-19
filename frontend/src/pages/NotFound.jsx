import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-4 flex items-center justify-center rounded-md border-gray-900 bg-gray-100 shadow-lg md:w-2/3">
        <div className="flex flex-col items-center py-16">
          <img
            alt="not-found"
            className="hidden px-4 md:block"
            src="https://i.ibb.co/9Vs73RF/undraw-page-not-found-su7k-1-3.png"
          />
          <img
            alt="not-found"
            className="md:hidden"
            src="https://i.ibb.co/RgYQvV7/undraw-page-not-found-su7k-1.png"
          />
          <h1 className="px-4 pb-4 pt-8 text-center text-5xl font-bold leading-10 text-gray-800">
            OOPS!
          </h1>
          <p className="px-4 pb-10 text-center text-base leading-none text-gray-700">
            No signal here! we cannot find the page you are looking for
          </p>
          <button
            onClick={handleGoBack}
            className="mx-4 h-10 w-48  rounded-md bg-orange-700 text-base text-gray-100 hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-800 focus:ring-opacity-50"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
