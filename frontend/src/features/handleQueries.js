import axios from "axios";
import { toast } from "react-toastify";
const BASE_URI = `${process.env.REACT_APP_BASE_URI}`;

// function for handle contact-us form
export const contactUs = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URI}/query/contact-us`, formData);
    if (response.status === 201) {
      return response.data.data.message;
    }
    toast.success("success", {
      delay: 1200,
      position: "bottom-right"
    });
  } catch (error) {
    console.log(error.message);
    toast.error("Something went wrong!", {
      delay: 1200,
      position: "bottom-right"
    });
  }
};

// function for get all queries => admin access
export const getQueries = async (restaurantToken) => {
  try {
    let configs = {
      headers: { Authorization: `Bearer ${restaurantToken}` },
    };
    const response = await axios.post(`${BASE_URI}/query/get-queries`, configs);
    if (response.status === 200) {
      return response.data.data.message;
    }
  } catch (error) {
    console.log(error.message);
    toast.error("Something went wrong!", {
      delay: 1000,
      position: "bottom-right"
    });
  }
};