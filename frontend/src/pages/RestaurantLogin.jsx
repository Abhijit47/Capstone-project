import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import _ from "lodash";
import GenericButton from "../components/GenericButton";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { restaurantSignIn } from "../redux/actions/restaurantAction";
import Loader from "../components/Loader";

const RestaurantLogin = () => {
  const [restaurantFormData, setRestaurantFormData] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  const { isLoading } = useSelector((state) => state.restaurants);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // destructuring form data
  const { email, password } = restaurantFormData;

  // define a function for handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantFormData({ ...restaurantFormData, [name]: value });
  };

  const restaurantToken = localStorage.getItem("restaurant-token");

  // define a function for handle form request
  const handleSubmit = (e) => {
    e.preventDefault();

    // check formdata is empty or not
    if (_.isEmpty(restaurantFormData)) {
      return toast.info("Please fill all the fields!", {
        position: "top-left",
        autoClose: 400,
      });
    }

    // dispatch signin request
    dispatch(
      restaurantSignIn({
        restaurantFormData,
        cb: (result) => {
          switch (result.status) {
            case 200:
              toast.success(result.data.status, {
                position: "top-center",
                autoClose: 500,
              });
              navigate("/");
              break;
            case 403:
              toast.info(result.data.message, {
                position: "top-center",
                autoClose: 1500,
                bodyClassName: "w-full text-xs",
              });
              navigate("/restaurant-login");
              break;
            case 404:
              toast.info(result.data.message, {
                position: "top-center",
                autoClose: 500,
              });
              navigate("/restaurant-login");
              break;
            case 500:
              toast.error("Internal Server Error", {
                position: "top-center",
                autoClose: 500,
              });
              navigate("/");
              break;
            default:
              toast.info("Something really going wrong", {
                position: "top-center",
                autoClose: 500,
              });
              navigate("/");
              break;
          }
        },
      }),
    );
  };

  // check restaurant is login or not
  useEffect(() => {
    if (_.isNull(restaurantToken)) {
      navigate("/restaurant-login");
    } else {
      navigate("/");
    }
  }, [navigate, restaurantToken]);

  return (
    <section className="flex min-h-screen flex-1 flex-col items-center justify-center gap-y-6 bg-gradient-to-tr from-pink-400 to-indigo-400 px-6 py-0 lg:px-8">
      {isLoading ? <Loader /> : null}
      {!isLoading && (
        <Fragment>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm lg:px-8">
            <BuildingStorefrontIcon className="mx-auto h-10 w-10 text-orange-300 xs:h-10 xs:w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Restaurant Login
            </h2>
          </div>

          <div className="w-11/12 pb-20 sm:w-8/12 md:w-7/12 lg:w-6/12 xl:w-5/12">
            <form
              className="grid grid-cols-1 gap-y-6 p-6"
              onSubmit={handleSubmit}
              method="POST"
            >
              {/* email */}
              <div className="col-span-12">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="form-input"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* password */}
              <div className="col-span-12">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-semibold text-gray-900 hover:text-gray-700"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="off"
                    required
                    className="form-input"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* button */}
              <div className="col-span-12 w-20 justify-self-center xs:w-1/3">
                <GenericButton buttonName={"Sign in"} />
              </div>
            </form>
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default RestaurantLogin;
