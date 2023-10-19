import React from "react";

const Loader = () => {
  return (
    <div
      aria-label="Loading..."
      role="status"
      className="flex h-[90vh] items-center justify-center"
    >
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-orange-700"></div>
    </div>
  );
};

export default Loader;
