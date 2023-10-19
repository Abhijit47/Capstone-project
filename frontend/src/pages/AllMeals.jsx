import React, { useEffect, useState } from "react";
import { getAllMeals } from "../features/handleMeals";
import MealCard from "../components/MealCard";

const AllMeals = () => {
  const [meals, setAllMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllMeals()
      .then((res) => {
        setIsLoading(true);
        setAllMeals(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <section className="p-10">
      <h3 className="text-center font-sans text-4xl font-bold text-gray-700">
        All Food Item's
      </h3>
      {isLoading || meals.length <= 0 ? (
        <div className="flex h-screen items-start justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed dark:border-purple-400"></div>
        </div>
      ) : (
        <div className="mb-16 mt-16 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {meals?.map((meal, index) => (
            <MealCard key={index} meal={meal} setAllMeals={setAllMeals} />
          ))}
        </div>
      )}
    </section>
  );
};

export default AllMeals;
