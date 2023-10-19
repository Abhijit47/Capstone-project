import React from "react";

const GenericButton = ({ buttonName }) => {
  return (
    <div>
      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
      >
        {buttonName}
      </button>
    </div>
  );
};

export default GenericButton;
