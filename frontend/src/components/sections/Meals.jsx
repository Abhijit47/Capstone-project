import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllMeals, deleteOneMeal } from "../../features/handleMeals";
// eslint-disable-next-line
import { toast } from "react-toastify";
import { addToCart } from "../../redux/slices/cartSlices";
import MealCard from "../MealCard";

const Meals = () => {
  // eslint-disable-next-line
  const [showModal, setShowModal] = useState(false);
  const [meals, setAllMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line
  const [isExpiredUserToken, setIsExpiredUserToken] = useState(false);
  // eslint-disable-next-line
  const [isExpiredRestaurantToken, setIsExpiredRestaurantToken] =
    useState(false);

  let location = useLocation();
  let { pathname } = location;

  // eslint-disable-next-line
  const userToken = localStorage.getItem("user-token");
  const restaurantToken = localStorage.getItem("restaurant-token");

  // eslint-disable-next-line
  const handleModal = () => {
    setShowModal(true);
  };
  // eslint-disable-next-line
  const handleDelete = async (mealId) => {
    await deleteOneMeal(mealId, restaurantToken);
    getAllMeals()
      .then((res) => {
        setAllMeals(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const handleAddToCart = (meal) => {
    dispatch(addToCart(meal));
    // toast.success("Items added to your cart.", {
    //   duration: 1500,
    //   position: "top-center",
    //   className: "bg-green-500 text-white",
    //   icon: "✅",
    //   ariaProps: {
    //     role: "status",
    //     "aria-live": "polite",
    //   },
    // });
  };

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
      <h3 className="mb-4 text-center font-sans text-xl font-bold text-orange-700">
        Meals
      </h3>
      <p className="mb-6 text-center font-sans font-bold text-gray-800 xs:text-lg sm:text-2xl md:text-3xl lg:text-5xl">
        Omnifood AI chooses from 5,000+ recipes
      </p>
      {isLoading && meals.length <= 0 ? (
        <div className="flex h-[90vh] items-start justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-blue-500"></div>
        </div>
      ) : (
        <Fragment>
          <div className="mb-10 mt-16 grid gap-y-4 xs:gap-y-6 sm:grid-cols-2 sm:gap-4 sm:gap-y-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
            {meals?.slice(0, 8).map((meal, index) => (
              <MealCard key={index} meal={meal} setAllMeals={setAllMeals} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            {pathname === "/all-meals" ? null : (
              <Link
                to={"/all-meals"}
                className="rounded-md bg-orange-500 px-2 py-1 text-[0.8rem] capitalize text-white shadow-2xl transition-all delay-75 duration-300 hover:translate-y-2 xs:px-2 xs:py-1 xs:text-sm md:px-4 md:py-2"
              >
                view more
              </Link>
            )}
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default Meals;
