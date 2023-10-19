import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import _ from "lodash";
import { isExpired } from "react-jwt";
import { userOrdersDetails } from "../features/handleOrders";

const UserProfile = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // function for day month formatter
  const dayMonthFormatter = (date) => {
    const options = { day: "numeric", month: "short" };
    return new Intl.DateTimeFormat("en-IN", options).format(new Date(date));
  };

  // function for year formatter
  const yearFormatter = (date) => {
    const options = { year: "numeric" };
    return new Intl.DateTimeFormat("en-IN", options).format(new Date(date));
  };

  const userToken = localStorage.getItem("user-token");

  // check if not user-token is expired and available.
  useEffect(() => {
    if (!isExpired(userToken) && !_.isEmpty(userToken)) {
      navigate("/user-profile");
    } else {
      localStorage.removeItem("user-token");
      navigate("/login");
    }
  }, [navigate, userToken]);

  // Get user orders
  useEffect(() => {
    const getUserOrders = async () => {
      setIsLoading(true);
      const res = await userOrdersDetails(userToken);
      setUserOrders(res);
      setIsLoading(false);
    };
    getUserOrders();
  }, [userToken]);

  return (
    <section className="h-full">
      <div className="mt-10 flex items-center justify-center">
        <div>
          {/* <!-- component --> */}
          <div className="flex items-center justify-center">
            <div className="grid max-w-5xl grid-cols-6 rounded-lg bg-blue-800">
              <div className="col-span-4">
                <h2 className="ml-10 mt-8 text-3xl font-bold text-white">
                  A food for your entire journey
                </h2>

                <p className="ml-10 mt-5 text-sm font-light text-white">
                  The smart 365-days-per-year food subscription that will make
                  you eat healthy again. Tailored to your personal tastes and
                  nutritional needs.
                </p>

                <button className="group mb-8 ml-10 mt-5 font-semibold text-white ">
                  View my all orders
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition transition-200 inline-block h-6 w-6 delay-100 group-hover:translate-x-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>

              <div className="relative col-span-2">
                <img
                  src="https://i.pravatar.cc/150"
                  className="absolute bottom-0 right-0 opacity-25"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4 className="p-4 text-center font-sans text-4xl font-bold text-gray-800">
        My orders
      </h4>
      {userOrders.length <= 0 ? (
        <div className="flex min-h-screen items-center justify-center">
          <h4 className="text-center font-sans text-4xl font-semibold">
            There is no orders to show
          </h4>
        </div>
      ) : null}
      {isLoading ? (
        <div className="flex min-h-screen items-start justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed dark:border-purple-400"></div>
        </div>
      ) : (
        <Fragment>
          <div className="grid grid-cols-2 gap-8 p-4">
            {userOrders?.map((order, index) => (
              <article className="flex bg-white hover:shadow-xl" key={index}>
                <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                  <time
                    dateTime={order.orderDate ? order.orderDate : null}
                    className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
                  >
                    <span>
                      {order.orderDate ? yearFormatter(order.orderDate) : null}
                    </span>
                    <span className="w-px flex-1 bg-gray-100"></span>
                    <span>
                      {order.orderDate
                        ? dayMonthFormatter(order.orderDate)
                        : null}
                    </span>
                  </time>
                </div>

                <div className="hidden sm:block sm:basis-56">
                  <img
                    alt={order.items[0].foodItem.itemName}
                    src={
                      order.items[0].foodItem.picture
                        ? order.items[0].foodItem.picture
                        : "https://placehold.co/600x400"
                    }
                    className="aspect-square h-full w-full transform-gpu cursor-pointer object-cover transition-all delay-200 duration-200 hover:scale-95"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                    <Link to="#!">
                      <h3 className="font-bold uppercase text-gray-900">
                        {order.items[0].foodItem.itemName
                          ? order.items[0].foodItem.itemName
                          : null}
                      </h3>
                    </Link>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                      {order.items[0].foodItem.description
                        ? order.items[0].foodItem.description
                        : null}
                    </p>
                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                      {order.restaurant.name ? order.restaurant.name : null}
                    </p>
                    <address className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                      {order.restaurant.address
                        ? order.restaurant.address
                        : null}
                    </address>
                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                      ₹&nbsp;{order.price ? order.price : "00"}.00
                    </p>
                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                      Order Status:&nbsp;
                      {order.paid ? (
                        <span className="rounded-full bg-green-500 px-1 text-xs text-white">
                          Booked
                        </span>
                      ) : null}
                    </p>
                  </div>

                  <div className="sm:flex sm:items-end sm:justify-end">
                    <Link
                      to="#!"
                      className="transition block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 hover:bg-yellow-400"
                    >
                      Know more
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default UserProfile;
