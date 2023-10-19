import React, { useState } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import GenericButton from "../components/GenericButton";
import FoodItemInputs from "../components/FoodItemInputs";
import { createFoodItem } from "../features/handleMeals";

const FoodItemCreate = () => {
  const [foodItem, setFoodItem] = useState({
    itemName: "",
    quantity: "",
    price: "",
    description: "",
    picture: "",
  });

  const navigate = useNavigate();

  const restaurantToken = localStorage.getItem("restaurant-token");

  // define a function for handle form request
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check formdata is empty or not
    if (_.isEmpty(foodItem)) {
      return toast.info("Please fill all the fields!", {
        position: "top-left",
        autoClose: 1500,
      });
    }

    // dispatch signin request
    await createFoodItem(foodItem, restaurantToken);
    navigate("/restaurant-profile");
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center gap-y-6 px-6 pb-12 pt-6 lg:px-8">
      <div className="mx-auto">
        <div className="p-4">
          <img
            className="mx-auto h-16 w-16 rounded-full bg-orange-400 xs:h-24 xs:w-24 sm:h-32 sm:w-32 md:h-32 md:w-32 lg:h-40 lg:w-40"
            src={require("../assets/icons/pizza-slice.png")}
            alt="Your Company"
          />
        </div>
        <h2 className="mt-6 text-center text-xl font-bold capitalize leading-9 tracking-tight text-gray-900 md:text-2xl">
          create food item
        </h2>
      </div>

      {/* <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md lg:max-w-lg"> */}
      <div className="mx-auto mt-10 w-11/12 lg:w-6/12">
        <form
          className="grid grid-cols-6 gap-x-6 gap-y-4 p-0 sm:gap-y-6 sm:p-8"
          onSubmit={handleSubmit}
          method="POST"
        >
          <FoodItemInputs foodItem={foodItem} setFoodItem={setFoodItem} />

          <div className="lg:4/12 xl:5/12 col-span-6 justify-self-center">
            <GenericButton buttonName={"Create food item"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodItemCreate;
