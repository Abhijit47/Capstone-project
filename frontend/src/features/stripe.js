import axios from "axios";
import { loadStripe } from "@stripe/stripe-js/pure";
import { toast } from "react-toastify";

const BASE_URI = `${process.env.REACT_APP_BASE_URI}`;
const userToken = localStorage.getItem("user-token");

export const orderFoodAndPayment = async (products) => {
  try {
    let configs = {
      headers: { Authorization: `Bearer ${userToken}` },
    };

    const stripe = await loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

    // Create a checkout session for book orders
    const sessionResponse = await axios.post(
      `${BASE_URI}/order/checkout-session`,
      products,
      configs,
    );

    // payment-session
    const session = sessionResponse.data.data.session;

    // Create booking for user orders
    const bookingResponse = await axios.post(
      `${BASE_URI}/order/create-order`,
      products,
      configs,
    );

    // check booking status
    if (bookingResponse.status === 201) {
      await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      toast.success("Booking Successfully", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true
      });
    }

  } catch (error) {
    console.log(error);
    toast.error(error.code, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
    });
  }
};


// Old code for single item book
// export const orderMeal = async (mealId, userToken, restaurantToken, price) => {
//   const stripe = await loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);
//   try {
//     let config = {
//       headers: { Authorization: `Bearer ${userToken || restaurantToken}` },
//     };
//     // 1. Get checkout session from API
//     const SESSION_URI = `${BASE_URI}/checkout-session/${mealId}`;
//     const CREATE_ORDER_URI = `${BASE_URI}/create-order/${mealId}`;

//     // 2. Create a session for order
//     const session = await axios.get(SESSION_URI, config);

//     // 2. Book a food item
//     const foodItem = await axios.post(CREATE_ORDER_URI, {
//       quantity: 1, price: price
//     }, config);

//     // Check status then redirect
//     if (foodItem.status === 201) {
//       // 3. create a checkout form + charge a credit card
//       await stripe.redirectToCheckout(
//         { sessionId: session.data.session.id }
//       );
//     }
//   } catch (error) {
//     console.log(error);
//     alert(error.message);
//   }

// };