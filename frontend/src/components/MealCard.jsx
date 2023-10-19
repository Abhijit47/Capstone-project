import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { isExpired } from "react-jwt";
import { getAllMeals, deleteOneMeal } from "../features/handleMeals";
import UpdateModal from "./UpdateModal";
import { addToCart } from "./../redux/slices/cartSlices";
import { toast } from "react-toastify";

const MealCard = ({ meal, setAllMeals }) => {
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line
  const [isExpiredUserToken, setIsExpiredUserToken] = useState(false);
  const [isExpiredRestaurantToken, setIsExpiredRestaurantToken] =
    useState(false);

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.users.token);

  // function for handle addTocart => user access
  const handleAddToCart = (card) => {
    dispatch(addToCart(card));
    toast.success("Item added to your cart.", {
      autoClose: 150,
      position: "top-center",
      hideProgressBar: true,
    });
  };

  // Get local-storage tokens
  const userToken = localStorage.getItem("user-token");
  const restaurantToken = localStorage.getItem("restaurant-token");

  // function for handle update modal => admin access
  const handleModal = () => {
    setShowModal(true);
  };

  // function for handle delete item => admin access
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

  useEffect(() => {
    if (!_.isNull(userToken)) {
      setIsExpiredUserToken(isExpired(userToken));
    } else if (!_.isNull(restaurantToken)) {
      setIsExpiredRestaurantToken(isExpired(restaurantToken));
    }
  }, [userToken, restaurantToken]);

  return (
    <div className="shadow-lg">
      <div className="group relative block cursor-pointer overflow-hidden">
        <button className="top-5 end-100 absolute z-10 float-left rounded-full bg-orange-200 p-1 text-gray-900 transition-all hover:text-gray-900/75">
          <span className="sr-only">Wishlist</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4 hover:text-red-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        <img
          src={meal.picture}
          alt={meal.itemName}
          className="sm:h-72 h-64 w-full object-cover transition-all duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="relative rounded-b-md border-b-4 border-orange-300 bg-white p-6">
          <div className="flex items-center justify-between">
            <span className="whitespace-nowrap bg-orange-400 px-3 py-2 text-xs font-medium">
              New
            </span>
            {_.isNull(restaurantToken) || isExpiredRestaurantToken ? null : (
              <div className="flex gap-2">
                <span className="cursor-pointer hover:text-orange-700">
                  <svg
                    onClick={handleModal}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </span>
                <UpdateModal
                  mealId={meal._id}
                  setAllMeals={setAllMeals}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
                <span className="cursor-pointer hover:text-red-700">
                  <svg
                    onClick={() => handleDelete(meal._id)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </span>
              </div>
            )}
          </div>

          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {meal.itemName}
          </h3>
          <h4 className="mt-2 text-sm text-gray-700">
            {meal?.description.length > 30
              ? `${meal.description.substr(0, 30)} ...`
              : meal.description}
          </h4>

          <p className="mt-2 text-xl font-semibold text-gray-900">
            ₹&nbsp;{meal.price}
          </p>
          <p className="text-xs text-gray-700">
            Item remains&nbsp;{meal.quantity}
          </p>
          {!_.isEmpty(userState) ||
          (!_.isEmpty(userToken) && !isExpiredUserToken) ? (
            <button
              className="mt-4 block w-full rounded-md bg-orange-400 p-2 text-sm font-medium transition-all delay-100 duration-100 hover:scale-105 xs:p-2 md:p-3 lg:p-4"
              onClick={() => handleAddToCart(meal)}
            >
              Add to Cart
            </button>
          ) : (
            <button
              className="mt-4 block w-full rounded-md bg-orange-400 p-2 text-sm font-medium transition-all delay-100 duration-100 hover:scale-105 xs:p-2 md:p-3 lg:p-4"
              disabled
            >
              Add to Cart
            </button>
          )}
          {/* <button
            className="mt-4 block w-full rounded-md bg-orange-400 p-2 text-sm font-medium transition-all delay-100 duration-100 hover:scale-105 xs:p-2 md:p-3 lg:p-4"
            onClick={() => handleAddToCart(meal)}
          >
            Add to Cart
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default MealCard;
