import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import {
  getAllMeals,
  getOneMeal,
  updateOneMeal,
} from "../features/handleMeals";
import UpdateFoodItemInputs from "./UpdateFoodItemInputs";
import GenericButton from "./GenericButton";

const UpdateModal = ({ mealId, setAllMeals, showModal, setShowModal }) => {
  const [mealData, setMealData] = useState({});
  const [isExpiredRestaurantToken, setIsExpiredRestaurantToken] =
    useState(false);
  const navigate = useNavigate();
  const [foodItem, setFoodItem] = useState({
    itemName: "",
    quantity: "",
    price: "",
    description: "",
    picture: "",
  });

  // 1. get food details and pre-filled the form
  const restaurantToken = localStorage.getItem("restaurant-token");
  useEffect(() => {
    if (!_.isNull(restaurantToken)) {
      setIsExpiredRestaurantToken(isExpired(restaurantToken));
    }
  }, [restaurantToken]);

  useEffect(() => {
    if (isExpiredRestaurantToken) {
      navigate("/restaurant-login");
    }
  }, [isExpiredRestaurantToken, navigate]);

  // for update food items
  useEffect(() => {
    if (_.isNull(restaurantToken)) {
      return;
    } else if (showModal) {
      getOneMeal(mealId, restaurantToken)
        .then((res) => {
          setMealData(res);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      getAllMeals()
        .then((res) => {
          setAllMeals(res);
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
  }, [mealId, navigate, showModal, restaurantToken, setAllMeals]);

  // 2. send a request to update
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = Object.assign(foodItem, { id: mealId });
    await updateOneMeal(formData, restaurantToken);
    // after successfull update
    setFoodItem({});
    setShowModal(false);
  };
  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-scroll outline-none focus:outline-none">
            <div className="relative mx-auto my-auto w-auto max-w-6xl">
              {/*content*/}
              <div className="relative mt-24 flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="border-b border-blueGray-200 rounded-t flex items-start justify-between border-solid p-5">
                  <h3 className="font-semibold capitalize xs:text-lg sm:text-xl md:text-2xl lg:text-3xl">
                    update food item
                  </h3>
                  <button
                    className="opacity-5 float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="opacity-5 block h-6 w-6 bg-transparent text-2xl text-black outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="flex flex-1 flex-col justify-center px-6 py-12 xs:w-[450px] sm:w-[600px] md:w-[600px] lg:w-[600px] lg:px-8">
                  <div className="bg-blue-400 sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                      className="mx-auto h-[10rem] w-full rounded-md object-cover object-center shadow-lg transition-all delay-200 duration-200 hover:scale-105"
                      src={
                        mealData?.picture
                          ? mealData.picture
                          : "https://placehold.co/600x400"
                      }
                      alt="meal_picture"
                      loading="lazy"
                      crossOrigin="true"
                      async
                      fetchpriority="high"
                    />
                  </div>

                  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
                    <form className="space-y-6" onSubmit={handleUpdate}>
                      <UpdateFoodItemInputs
                        mealData={mealData}
                        foodItem={foodItem}
                        setFoodItem={setFoodItem}
                      />

                      <GenericButton buttonName={"Update food item"} />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
};

export default UpdateModal;
