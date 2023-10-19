import React, { useEffect, useState } from "react";
import AllRestaurentCards from "../components/AllRestaurentCards";
import { getAllRestaurants } from "../features/handleRestaurents";

const AllRestaurents = () => {
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // call getRestaurantsData function
  useEffect(() => {
    const getRestaurantsData = async () => {
      setIsLoading(true);
      const res = await getAllRestaurants();
      setRestaurantsData(res);
      setIsLoading(false);
    };

    getRestaurantsData();
  }, []);

  return (
    <section className="h-auto">
      <h3 className="mb-10 text-center font-sans text-4xl font-bold">
        Our Restaurents
      </h3>
      {isLoading ? (
        <div className="flex h-[90vh] items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed dark:border-purple-400"></div>
        </div>
      ) : (
        <div>
          <AllRestaurentCards restaurantsData={restaurantsData} />
        </div>
      )}
    </section>
  );
};

export default AllRestaurents;
