import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import { restaurantOrdersDetails } from "../features/handleOrders";
import { getRestaurantDetails } from "../features/handleRestaurents";
import { starPrint } from "../features/starPrint";
import _ from "lodash";
import {
  MapPinIcon,
  BriefcaseIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { handleLogout } from "../components/Navbar";
import Loader from "../components/Loader";

const RestaurantProfile = () => {
  const [restaurantProfile, setRestaurantProfile] = useState({});
  const [restaurantOrders, setRestaurantOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const restaurantToken = localStorage.getItem("restaurant-token");

  // check token is expired or not
  useEffect(() => {
    try {
      if (!isExpired(restaurantToken) && !_.isEmpty(restaurantToken)) {
        navigate("/restaurant-profile");
      } else {
        localStorage.removeItem("restaurant-token");
        navigate("/restaurant-login");
      }
    } catch (error) {
      console.log(error);
    }
  }, [navigate, restaurantToken]);

  // call restaurant order details
  useEffect(() => {
    const getUserOrders = async () => {
      setIsLoading(true);
      const res = await restaurantOrdersDetails(restaurantToken);
      setRestaurantOrders(res);
      setIsLoading(false);
    };

    getUserOrders();
  }, [restaurantToken, navigate]);

  // call restaurant profile details
  useEffect(() => {
    const getRestaurantProfile = async () => {
      setIsLoading(true);
      const res = await getRestaurantDetails(restaurantToken);
      setRestaurantProfile(res);
      setIsLoading(false);
    };

    getRestaurantProfile();
  }, [restaurantToken]);

  return (
    <section>
      {isLoading || _.isEmpty(restaurantProfile) ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="relative block h-[500px]">
            <div
              className="absolute top-0 h-[20rem] w-full bg-cover bg-center xs:h-[22rem] sm:h-64"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1551218372-a8789b81b253?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80')",
              }}
            >
              <span
                id="blackOverlay"
                className="absolute h-full w-full bg-black opacity-50"
              ></span>
            </div>
            {/* <div
              className="h-70-px pointer-events-none absolute bottom-0 left-0 right-0 top-auto w-full overflow-hidden"
              style={{ transform: "translateZ(0px)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-current text-gray-800"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div> */}
          </div>
          <div className="relative bg-gray-200 py-16 sm:py-0">
            <div className="container mx-auto px-4">
              {/* restaurant profile-card */}
              <div className="relative -mt-64 mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-xl">
                <div className="sm:px-3 sm:py-4 md:px-6 md:py-8">
                  {/* restaurant topbar */}
                  <div className="flex flex-wrap justify-center">
                    {/*profile top bar image */}
                    <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                      <div className="relative">
                        <img
                          alt="..."
                          src="https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&h=600&w=600&q=80"
                          className="absolute -m-16 -ml-20 max-w-[150px] rounded-full border-none align-middle shadow-xl lg:-ml-16"
                        />
                      </div>
                    </div>

                    {/* profile top bar button and link  */}
                    <div className="w-full px-4 sm:mt-24 md:mt-24 lg:order-3 lg:mt-0 lg:w-4/12 lg:self-center lg:text-right">
                      <div className="mt-32 flex items-center justify-end gap-8 xs:justify-center sm:mt-0">
                        <Link
                          to={"/food-item-create"}
                          className="cursor-pointer rounded-md border-b-2 text-gray-700 hover:border-b-orange-500"
                        >
                          Create Food Item
                        </Link>
                        <button
                          className="shadow mb-1 rounded-md bg-red-500 px-4 py-2 text-xs font-bold uppercase text-white outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-red-600 sm:mr-2"
                          type="button"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    </div>

                    {/* profile top bar statictics */}
                    <div className="w-full px-4 lg:order-1 lg:w-4/12">
                      <div className="flex justify-center py-4 pt-8 lg:pt-4">
                        <div className="mr-4 p-3 text-center">
                          <span className="block text-xl font-bold uppercase tracking-wide text-gray-600">
                            {restaurantOrders?.length || 0}
                          </span>
                          <span className="text-sm text-gray-400">Orders</span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="block text-xl font-bold uppercase tracking-wide text-gray-600">
                            10
                          </span>
                          <span className="text-sm text-gray-400">Items</span>
                        </div>
                        <div className="p-3 text-center lg:mr-4">
                          <span className="block text-xl font-bold uppercase tracking-wide text-gray-600">
                            89
                          </span>
                          <span className="text-sm text-gray-400">Stock</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* restaurant types */}
                  <div className="mt-12 text-center">
                    {restaurantProfile.cuisine?.map((type, index) => (
                      <div
                        className="flex items-center justify-center"
                        key={index}
                      >
                        <p className="rounded-full bg-gradient-to-tr from-pink-500 to-blue-500 px-2 text-gray-100">
                          {type}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* restaurant name */}
                  <div className="mt-4 text-center">
                    <h3 className="mb-2 font-semibold leading-normal text-gray-700 xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                      {restaurantProfile
                        ? restaurantProfile.name
                        : "Name not found!"}
                    </h3>
                    <div className="mb-2 mt-0 flex items-center justify-center  gap-4 text-sm font-bold uppercase leading-normal text-gray-400">
                      <MapPinIcon className="h-6 w-6 text-orange-300" />
                      <address className="text-orange-400">
                        {restaurantProfile
                          ? restaurantProfile.address
                          : "Address not found!"}
                      </address>
                    </div>
                    <div className="mb-2 mt-10 flex items-center justify-center gap-4 text-gray-600">
                      <BriefcaseIcon className="h-6 w-6 text-orange-400" />
                      {restaurantProfile ? (
                        <span className="cursor-pointer hover:text-orange-400">
                          <Link to={`mailto:${restaurantProfile.email}`}>
                            {restaurantProfile.email}
                          </Link>
                        </span>
                      ) : (
                        "Email not found!"
                      )}
                    </div>
                    <div className="mb-2 flex items-center justify-center gap-4 text-gray-600">
                      <span className="flex items-center justify-center gap-2">
                        <ClockIcon className="h-4 w-4" />
                        {restaurantProfile.openingTime}&nbsp;AM
                      </span>
                      ||
                      <span className="flex items-center justify-center gap-2">
                        <ClockIcon className="h-4 w-4" />
                        {restaurantProfile.closingTime}&nbsp;PM
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span>Rating&nbsp;</span>
                      <span>{restaurantProfile?.rating || 0}</span>
                      <span>{starPrint(restaurantProfile.rating)}</span>
                    </div>
                  </div>

                  {/* restaurant menu */}
                  <h4 className="mt-4 border-y-2 border-blue-500 text-center font-sans text-3xl font-semibold">
                    Our Menu's
                  </h4>
                  <div className="grid justify-items-center gap-4 lg:grid-cols-3">
                    {restaurantProfile?.menu?.map((product, index) => (
                      <div
                        className="border relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border-gray-100 bg-white shadow-md"
                        key={index}
                      >
                        <a
                          className="h-60 rounded-xl relative mx-3 mt-3 flex overflow-hidden"
                          href="#!"
                        >
                          <img
                            className="mx-auto h-64 w-full object-cover object-center transition-all delay-200 duration-200 hover:scale-95"
                            src={product.picture}
                            alt="product_image"
                          />
                          <span className="absolute left-0 top-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                            39% OFF
                          </span>
                        </a>
                        <div className="mt-4 px-5 pb-5">
                          <a href="#!">
                            <h5 className="text-xl tracking-tight text-gray-900">
                              {product.itemName}
                            </h5>
                          </a>
                          <div className="mb-5 mt-2 flex flex-col items-center justify-between gap-4">
                            <p className="text-sm text-gray-700">
                              {product.description.length > 30
                                ? `${product.description.substring(0, 35)} ...`
                                : product.description}
                            </p>

                            <p>
                              <span className="text-3xl font-bold text-gray-900">
                                ₹&nbsp;{product.price}&nbsp;
                              </span>
                              <span className="text-sm text-gray-900 line-through">
                                ₹&nbsp;{product.price}
                              </span>
                            </p>
                            <p className="border-y-2">
                              Reamining stock:&nbsp;{product.quantity}&nbsp;Pcs.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* restaurant menu end*/}

                  {/* restaurant order */}
                  <h4 className="mb-8 mt-8 border-x-4 border-blue-500 text-center font-sans text-3xl font-semibold">
                    Order's List
                  </h4>
                  {restaurantOrders.length <= 0 ? (
                    <div className="flex min-h-screen items-center justify-center">
                      <h4 className="text-center font-sans text-4xl font-semibold">
                        There is no orders to show
                      </h4>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {restaurantOrders?.map((order, index) => (
                        <article
                          className="rounded-lg border-x-2 border-gray-600 bg-white p-4 shadow-sm transition-all hover:shadow-lg sm:p-6"
                          key={index}
                        >
                          <span className="mx-auto flex w-6/12 rounded-md bg-gray-100 p-2 text-white">
                            <img
                              className="mx-auto h-32 w-32 cursor-pointer rounded-full transition-all delay-200 duration-200 hover:scale-95"
                              src={order?.items[0]?.foodItem?.picture}
                              alt={order?.items[0]?.foodItem?.itemName}
                            />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 64 64"
                              id="food-stand"
                              className="h-8 w-8"
                            >
                              <circle
                                cx="32"
                                cy="32"
                                r="32"
                                fill="#4d94bc"
                              ></circle>
                              <path
                                fill="#141414"
                                d="M44.99 13.91c-.34 0-.62.28-.62.62v4.85c0 2.12-1.57 3.88-3.61 4.18v-9.03c0-.34-.28-.62-.62-.62-.34 0-.62.28-.62.62v9.03a4.232 4.232 0 0 1-3.61-4.18v-4.85c0-.34-.28-.62-.62-.62-.34 0-.62.28-.62.62v4.85c0 2.81 2.13 5.13 4.85 5.43v25.55c0 .34.28.62.62.62.34 0 .62-.28.62-.62V24.82a5.475 5.475 0 0 0 4.85-5.43v-4.85c0-.35-.28-.63-.62-.63zM25.11 33.66v-5c3.07-.44 5.48-4.11 5.48-8.56 0-4.74-2.74-8.6-6.1-8.6-3.36 0-6.1 3.86-6.1 8.6 0 4.45 2.4 8.12 5.48 8.56v5a3.73 3.73 0 0 0-3.11 3.67v11.44c0 2.06 1.68 3.73 3.73 3.73s3.73-1.67 3.73-3.73V37.33a3.71 3.71 0 0 0-3.11-3.67zM19.64 20.1c0-4.06 2.18-7.35 4.86-7.35s4.86 3.3 4.86 7.35c0 4.06-2.18 7.36-4.86 7.36s-4.86-3.3-4.86-7.36zm7.34 28.67a2.49 2.49 0 0 1-4.98 0V37.33c0-1.37 1.12-2.49 2.49-2.49a2.49 2.49 0 0 1 2.49 2.49v11.44z"
                              ></path>
                              <path
                                fill="#98d3ba"
                                d="M26.98 37.33v11.44a2.49 2.49 0 0 1-4.98 0V37.33c0-1.37 1.12-2.49 2.49-2.49s2.49 1.12 2.49 2.49zm2.37-17.23c0 4.06-2.18 7.36-4.86 7.36s-4.86-3.3-4.86-7.36c0-4.06 2.18-7.35 4.86-7.35s4.86 3.29 4.86 7.35z"
                              ></path>
                            </svg>
                          </span>

                          <Link to="#!">
                            <h3 className="mt-1 text-center text-lg font-medium text-gray-900">
                              {order?.items[0]?.foodItem?.itemName}
                            </h3>
                          </Link>

                          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                            {order?.items[0]?.foodItem?.description.length > 50
                              ? `${order?.items[0]?.foodItem?.description.substr(
                                  0,
                                  50,
                                )} ...`
                              : order?.items[0]?.foodItem?.description}
                          </p>

                          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-600">
                            Quantity:&nbsp;
                            {order?.items[0]?.quantity}&nbsp;Pcs.
                          </p>
                          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-600">
                            Price:&nbsp;₹
                            {order?.items[0]?.quantity * order?.price}
                            <span className="text-xs">
                              &nbsp;(Each:&nbsp;₹
                              {order?.price})
                            </span>
                          </p>
                          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-600">
                            Status:&nbsp;
                            {order?.paid ? (
                              <span className="rounded-full bg-green-500 px-3 text-sm text-gray-100">
                                Paid
                              </span>
                            ) : (
                              <apan>Unpaid</apan>
                            )}
                          </p>
                          <p className="mt-2 line-clamp-3 text-sm/relaxed capitalize text-gray-600">
                            {order?.user?.name}
                          </p>
                          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-600">
                            {order?.user?.email}
                          </p>

                          <Link
                            to="#!"
                            className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
                          >
                            Find out more
                            <span
                              aria-hidden="true"
                              className="group-hover:ms-0.5 block transition-all rtl:rotate-180"
                            >
                              &rarr;
                            </span>
                          </Link>
                        </article>
                      ))}
                    </div>
                  )}
                  {/* restaurant order end */}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default RestaurantProfile;
