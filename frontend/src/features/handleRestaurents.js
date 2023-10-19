import axios from "axios";

const BASE_URI = `${process.env.REACT_APP_BASE_URI}`;

// function for get restaurant profile details
export const getRestaurantDetails = async (restaurantToken) => {
  try {
    let configs = {
      headers: { Authorization: `Bearer ${restaurantToken}` },
    };

    const res = await axios.get(`${BASE_URI}/restaurant/get-restaurant`, configs);
    if (res.status === 200) {
      return res.data.data.restaurant;
    }

  } catch (error) {
    console.log(error.message);
  }
};

// function for get all restaurants details
export const getAllRestaurants = async () => {
  try {

    const res = await axios.get(`${BASE_URI}/restaurant/get-all-restaurants`);
    if (res.status === 200) {
      return res.data.data.restaurants;
    }
  } catch (error) {
    console.log(error.message);
  }
};