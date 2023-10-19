import axios from "axios";
import { toast } from "react-toastify";

const BASE_URI = `${process.env.REACT_APP_BASE_URI}`;

// function for create food item => admin access
export const createFoodItem = async (formData, token) => {

  let config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  try {
    const res = await axios.post(`${BASE_URI}/foodItem/create-item`, formData, config);
    if (res.status === 201) {
      return toast.success(res.data.status, {
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-green-500 text-gray-200"
      });
    }
  } catch (error) {
    console.log(error);
    return toast.error(error.message, {
      position: "top-right",
      autoClose: 1500,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "bg-red-500 text-gray-200"
    });
  }
};

// function for get all meals data => all access
export const getAllMeals = async () => {
  try {
    const res = await axios.get(`${BASE_URI}/foodItem/all-food-items`);
    toast.success(res.data.message, {
      position: "top-center",
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "bg-green-500 text-gray-200"
    });
    return res.data.data.items;
  } catch (err) {
    console.log(err);
    toast.error(err.message, {
      position: "top-left",
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "bg-red-500 text-gray-200"
    });
  }
};

// function for get one meal details => user access (not used)
export const getOneMeal = async (id, restaurantToken, userToken) => {

  let config = {
    headers: { Authorization: `Bearer ${restaurantToken || userToken}` }
  };

  try {
    const res = await axios.get(`${BASE_URI}/foodItem/get-one-food/${id}`, config);
    toast.success(res.data.message, {
      position: "top-center",
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "bg-green-500 text-gray-200"
    });
    return res.data.data.food;
  } catch (err) {
    console.log(err);
    toast.error(err.message, {
      position: "top-center",
      autoClose: 1500,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "bg-red-500 text-gray-200"
    });
  }
};

// function for get one meal details => admin access
export const updateOneMeal = async (formdata, restaurantToken) => {
  let config = {
    headers: { Authorization: `Bearer ${restaurantToken}` }
  };
  try {
    const res = await axios.patch(`${BASE_URI}/foodItem/update-item`, formdata, config);
    toast.success(res.data.message, {
      position: "bottom-left",
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "bg-green-500 text-gray-200"
    });
    return res.data.data.updatedItem;
  } catch (err) {
    console.log(err);
    toast.error(err.message, {
      position: "bottom-left",
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "bg-red-500 text-gray-200"
    });
  }
};

// function for get one meal details => admin access
export const deleteOneMeal = async (mealId, restaurantToken) => {

  let config = {
    headers: { Authorization: `Bearer ${restaurantToken}` }
  };

  try {
    const res = await axios.delete(`${BASE_URI}/foodItem/delete-item/${mealId}`, config);
    if (res.status === 204) {
      toast.success("Successfully deleted", {
        position: "bottom-right",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-green-500 text-gray-200"
      });
    }

    return res;
  } catch (err) {
    console.log(err);
    toast.error(err.message, {
      position: "bottom-right",
      autoClose: 1500,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "bg-red-500 text-gray-200"
    });
  }
};