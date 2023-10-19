import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementCartItem,
  emptyCartItems,
  removeToCart,
} from "../redux/slices/cartSlices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { orderFoodAndPayment } from "../features/stripe";

function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const { carts } = useSelector((state) => state.carts);
  const userState = useSelector((state) => state.users.token);
  const userToken = localStorage.getItem("user-token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // function to handle increment cart
  const handleIncrement = (item) => {
    dispatch(addToCart(item));
    toast.info("Items added to your cart.", {
      autoClose: 300,
      position: "top-center",
      hideProgressBar: true,
    });
  };

  // function to handle remove one item in cart
  const handleRemoveCart = (itemId) => {
    dispatch(removeToCart(itemId));
    toast.success("Items removed successfully.", {
      autoClose: 300,
      position: "top-center",
      hideProgressBar: true,
    });
  };

  // function to handle decrement cart
  const handleDecrement = (item) => {
    dispatch(decrementCartItem(item));
    toast.info("Item removed to your cart.", {
      autoClose: 300,
      position: "top-center",
      hideProgressBar: true,
    });
  };

  // function to handle empty cart
  const handleEmptyCart = () => {
    dispatch(emptyCartItems());
    toast.error("All items removed to your cart.", {
      autoClose: 300,
      position: "top-center",
      hideProgressBar: true,
    });
  };

  // calculate total price
  const calcTotalPrice = () => {
    let totalPrice = 0;

    carts.map((cartItem, index) => {
      return (totalPrice = cartItem.price * cartItem.quantity + totalPrice);
    });
    setTotalPrice(totalPrice);
  };

  // calculate total quantity
  const calTotalQuantity = () => {
    let totalQuantity = 0;

    carts.map((cartItem, index) => {
      return (totalQuantity = cartItem.quantity + totalQuantity);
    });
    setTotalQuantity(totalQuantity);
  };

  // make payment and book order
  const handleMakePayment = async (event, cartItems) => {
    event.target.textContent = "Processing...";

    // dispatch order and make payment
    await orderFoodAndPayment(cartItems);
  };

  // check user-state or user-token available or not
  useEffect(() => {
    if (userState || userToken) {
      navigate("/your-cart");
    } else {
      navigate("/login");
    }
  }, [userState, userToken, navigate]);

  // calculate total price and total quantity
  useEffect(() => {
    calcTotalPrice();
    calTotalQuantity();
  });

  return (
    <section id="cart">
      {/* <h3 className="text-center font-sans text-3xl font-semibold text-gray-800">
        Your Cart 🛒
      </h3> */}
      <div
        className="transition sticky right-0 z-[999] h-screen w-full translate-x-0 transform overflow-x-hidden duration-700 ease-in-out"
        id="scroll"
      >
        <div className="flex flex-col justify-between md:flex-row" id="scroll">
          {/* Left side */}
          <div
            className="h-screen w-full overflow-x-hidden overflow-y-scroll bg-white py-8 pl-4 pr-10 md:py-12 md:pl-10 md:pr-4 lg:w-1/2"
            id="scroll"
          >
            <div
              className="flex cursor-pointer items-center text-gray-600 hover:text-orange-600"
              onClick={() => navigate("/")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-chevron-left"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="15 6 9 12 15 18" />
              </svg>
              <p className="pl-2 text-sm leading-none">Back</p>
            </div>
            <div className="flex items-center justify-between p-4">
              <p className="text-lg font-black leading-10 text-orange-800 xs:text-2xl xs:leading-5 lg:text-5xl">
                Items<span className="text-sm">({carts.length})</span>
              </p>
              {carts.length <= 0 ? null : (
                <div>
                  <button
                    className="text-slate-50 flex items-center gap-2 rounded-md bg-red-500 px-3 py-1 hover:bg-red-600"
                    onClick={handleEmptyCart}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-slate-50 h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Empty cart</span>
                  </button>
                </div>
              )}
            </div>
            {carts.length <= 0 ? (
              <div className="mt-14 flex flex-col items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-slate-800 h-6 w-6 xs:h-8 xs:w-8 sm:h-10 sm:w-10"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="xs:text-base lg:text-3xl">
                  Your cart is empty!
                </h3>
              </div>
            ) : (
              <Fragment>
                {carts.map((cartItem, index) => (
                  <div
                    className="border-t items-center border-gray-200 py-8 md:flex"
                    key={index}
                  >
                    <div className="w-1/4">
                      <img
                        src={cartItem.picture}
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="md:w-3/4 md:pl-3">
                      <p className="pt-4 text-xs capitalize leading-3 text-gray-800 md:pt-0">
                        {cartItem.itemName}
                      </p>
                      <div className="flex w-full items-center justify-between pt-1">
                        <p className="text-base font-black leading-none text-gray-800">
                          {cartItem.itemName}
                        </p>
                        <div className="flex justify-end">
                          <button
                            className="px-3 py-1"
                            onClick={
                              cartItem.quantity <= 1
                                ? () => handleRemoveCart(cartItem._id)
                                : () => handleDecrement(cartItem)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-6 w-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                          <div className="w-2/12">
                            <input
                              type="text"
                              id={`item-count_${index + 1}`}
                              value={cartItem.quantity}
                              readOnly
                              className="border border-slate-900 h-full w-full rounded-md text-center"
                            />
                          </div>
                          <button
                            className="px-3 py-1"
                            onClick={() => handleIncrement(cartItem)}
                          >
                            <svg
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
                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <p className="py-2 text-xs leading-3 text-gray-600">
                        {cartItem.description}
                      </p>
                      <p className="w-96 text-xs leading-3 text-gray-600">
                        Discount:&nbsp;₹&nbsp;0.00
                      </p>
                      <div className="flex items-center justify-between pr-6 pt-5">
                        <div className="itemms-center flex">
                          <p className="cursor-pointer text-xs leading-3 text-gray-800 underline">
                            Add to favorites
                          </p>
                          <button
                            onClick={() => handleRemoveCart(cartItem._id)}
                            className="cursor-pointer pl-5 text-xs leading-3 text-red-500 underline"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-base font-black leading-none text-gray-800">
                          ₹&nbsp;
                          {cartItem.price * cartItem.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </Fragment>
            )}
          </div>

          {/* Right side */}
          <div
            className="h-full w-full bg-gray-100 md:w-full lg:w-1/2 xl:w-1/2"
            id="scroll"
          >
            <div className="flex flex-col justify-between overflow-y-auto px-20 py-20 md:h-screen">
              {/* checkout summary */}
              <div>
                <p className="font-black leading-9 text-gray-800 xs:text-2xl lg:text-4xl">
                  Summary
                </p>
                <div className="flex items-center justify-between pt-16">
                  <p className="text-base leading-none text-gray-800">
                    Quantity
                  </p>
                  <p className="text-base leading-none text-gray-800">
                    {totalQuantity}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-5">
                  <p className="text-base leading-none text-gray-800">
                    Subtotal
                  </p>
                  <p className="text-base leading-none text-gray-800">
                    ₹&nbsp;{totalPrice}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-5">
                  <p className="text-base leading-none text-gray-800">
                    Shipping
                  </p>
                  <p className="text-base leading-none text-gray-800">$0</p>
                </div>
                <div className="flex items-center justify-between pt-5">
                  <p className="text-base leading-none text-gray-800">Tax</p>
                  <p className="text-base leading-none text-gray-800">$0</p>
                </div>
              </div>

              {/* checkout button */}
              <div>
                <div className="flex items-center justify-between pb-6 pt-20 lg:pt-5">
                  <p className="text-2xl leading-normal text-gray-800">Total</p>
                  <p className="text-right text-2xl font-bold leading-normal text-gray-800">
                    ₹&nbsp;{totalPrice}
                  </p>
                </div>
                {carts.length <= 0 ? (
                  <button
                    onClick={() => navigate("/")}
                    className="border w-full rounded-md border-gray-800 bg-gray-800 py-2 text-base leading-none text-white transition-all delay-75 duration-100 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 xs:py-2 sm:py-3 md:py-4 lg:py-5"
                  >
                    No items for Checkout
                  </button>
                ) : (
                  <button
                    onClick={(ev) => handleMakePayment(ev, carts)}
                    className="border w-full rounded-md border-gray-800 bg-gray-800 py-5 text-base leading-none text-white transition-all delay-75 duration-100 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                  >
                    Checkout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {` /* width */
                #scroll::-webkit-scrollbar {
                    width: 1px;
                }

                /* Track */
                #scroll::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                /* Handle */
                #scroll::-webkit-scrollbar-thumb {
                    background: rgb(133, 132, 132);
                }
`}
      </style>
    </section>
  );
}

export default Cart;
