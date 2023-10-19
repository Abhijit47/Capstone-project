import React from "react";
import { Link } from "react-router-dom";

const FormFooter = ({ text, to, message }) => {
  return (
    <p className="mt-10 text-center text-sm text-gray-500">
      {text ? text : "Not a member?"}{" "}
      <Link
        to={to}
        className="font-semibold leading-6 text-orange-600 hover:text-orange-500"
      >
        {message ? message : "Start a 14 day free trial"}
      </Link>
    </p>
  );
};

export default FormFooter;
