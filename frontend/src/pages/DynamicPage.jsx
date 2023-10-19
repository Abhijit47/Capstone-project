import React from "react";
import { useLocation } from "react-router-dom";

const DynamicPage = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <section className="flex h-screen items-center justify-center">
      <h4 className="text-center font-sans text-5xl font-bold capitalize">
        {pathname.slice(1).replaceAll("%20", " ")}&nbsp;Page
      </h4>
    </section>
  );
};

export default DynamicPage;
