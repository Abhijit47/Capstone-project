import React, { Fragment, useState } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import GenericButton from "../components/GenericButton";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { restaurantSignUp } from "../redux/actions/restaurantAction";
import { toast } from "react-toastify";

const ReataurantSignup = () => {
  const [restaurantFormData, setRestaurantFormData] = useState({
    name: "",
    address: "",
    cuisine: "",
    rating: "",
    openingTime: "",
    closingTime: "",
    username: "",
    email: "",
    role: "admin",
    password: "",
    confirmPassword: "",
  });

  const { isLoading } = useSelector((state) => state.restaurants);

  const dispatch = useDispatch();

  // eslint-disable-next-line
  const navigate = useNavigate();

  // destructuring form data
  const {
    name,
    address,
    cuisine,
    rating,
    openingTime,
    closingTime,
    username,
    email,
    password,
    confirmPassword,
  } = restaurantFormData;

  // define a function for handle change form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantFormData({ ...restaurantFormData, [name]: value });
  };

  // define a function for handle form request
  const handleSubmit = async (e) => {
    // Prevent default form behavior
    e.preventDefault();

    // check password and conf.Password are same or not
    if (!_.isEqual(password, confirmPassword)) {
      return toast.info("Passwords are not matched!", {
        autoClose: 400,
        position: "top-center",
        hideProgressBar: true,
      });
    }

    // dispatch signup request with form data
    dispatch(
      restaurantSignUp({
        restaurantFormData,
        cb: (result) => {
          switch (result.status) {
            case 201:
              toast.success(result.data.status, {
                position: "top-center",
                autoClose: 500,
              });
              navigate("/login");
              break;
            case 400:
              toast.info(result.data.message, {
                position: "top-center",
                autoClose: 1250,
                bodyClassName: "w-full text-xs",
              });
              navigate("/");
              break;
            case 500:
              toast.error(result.data.message, {
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

  return (
    <section className="flex min-h-full flex-1 flex-col justify-center bg-gradient-to-tr from-pink-400 to-indigo-400 px-6 pb-32 pt-6 lg:px-8">
      {isLoading ? <Loader /> : null}
      {!isLoading && (
        <Fragment>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <BuildingStorefrontIcon className="mx-auto h-10 w-10 text-orange-300 xs:h-10 xs:w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Restaurant Sign up
            </h2>
          </div>

          <div>
            <form
              className="grid grid-cols-12 gap-x-1 p-2 xs:gap-x-8 xs:gap-y-3 xs:p-8 sm:gap-y-3 md:gap-y-6 lg:gap-y-8"
              onSubmit={handleSubmit}
              method="POST"
            >
              {/* name */}
              <div className="col-span-12 xs:col-span-12 sm:col-span-12 lg:col-span-6">
                <label htmlFor="name" className="form-label">
                  restaurant name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    required
                    className="form-input"
                    placeholder="Ex: casa mexicana"
                    value={name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* address */}
              <div className="col-span-12 lg:col-span-6">
                <label htmlFor="address" className="form-label">
                  restaurant address
                </label>
                <div className="mt-2">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="off"
                    required
                    className="form-input"
                    placeholder="Ex: 123, main street, NY"
                    value={address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* cuisine/type */}
              {/* <div className="">
            <label htmlFor="cuisine" className="form-label">
              cuisine
            </label>
            <div className="mt-2">
              <input
                id="cuisine"
                name="cuisine"
                type="text"
                autoComplete="off"
                required
                className="form-input"
                value={cuisine}
                onChange={handleChange}
              />
            </div>
          </div> */}

              {/* cuisine/type select menu option */}
              <div className="col-span-12 md:col-span-3 lg:col-span-3">
                <label htmlFor="cuisine" className="form-label">
                  Cuisine
                </label>
                <div className="mt-2">
                  <select
                    id="cuisine"
                    name="cuisine"
                    type="text"
                    autoComplete="off"
                    required
                    className="form-input"
                    defaultValue={cuisine}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Choose a restaurant type
                    </option>
                    <option value={"indian"}>Indian</option>
                    <option value={"japanese"}>Japanese</option>
                    <option value={"mexican"}>Mexican</option>
                    <option value={"itanlian"}>Itanlian</option>
                    <option value={"thai"}>Thai</option>
                    <option value={"american"}>American</option>
                  </select>
                </div>
              </div>

              {/* rating */}
              <div className="col-span-12 md:col-span-3 lg:col-span-3">
                <label htmlFor="rating" className="form-label">
                  rating
                </label>
                <div className="mt-2">
                  <input
                    id="rating"
                    name="rating"
                    type="text"
                    maxLength={3}
                    autoComplete="off"
                    required
                    className="form-input"
                    value={rating}
                    placeholder="Ex: 4.3"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* opening/time */}
              <div className="col-span-12 md:col-span-3 lg:col-span-3">
                <label htmlFor="openingTime" className="form-label">
                  opening time
                </label>
                <div className="mt-2">
                  <input
                    id="openingTime"
                    name="openingTime"
                    type="time"
                    min="09:00"
                    max="23:00"
                    autoComplete="off"
                    required
                    className="form-input"
                    value={openingTime}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* closing time */}
              <div className="col-span-12 md:col-span-3 lg:col-span-3">
                <label htmlFor="closingTime" className="form-label">
                  closing time
                </label>
                <div className="mt-2">
                  <input
                    id="closingTime"
                    name="closingTime"
                    type="time"
                    min="09:00"
                    max="23:00"
                    autoComplete="off"
                    required
                    className="form-input"
                    value={closingTime}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* username */}
              <div className="col-span-12 lg:col-span-6">
                <label htmlFor="username" className="form-label">
                  username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    minLength={3}
                    autoComplete="off"
                    required
                    className="form-input"
                    value={username}
                    placeholder="Ex: restaurant123"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* email */}
              <div className="col-span-12 lg:col-span-6">
                <label htmlFor="email" className="form-label">
                  email address
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
                    placeholder="Ex: jhon@example.com"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* <div>
            <label htmlFor="role" className="form-label">
              role
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="role"
                name="role"
                className="form-input select-none"
                autoComplete="off"
                required
                value={role}
                disabled
              />
            </div>
          </div> */}

              {/* password */}
              <div className="col-span-12 lg:col-span-6">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="form-label">
                    password
                  </label>
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

              {/* password confirm */}
              <div className="col-span-12 lg:col-span-6">
                <div className="flex items-center justify-between">
                  <label htmlFor="confirmPassword" className="form-label">
                    confirm password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="off"
                    required
                    className="form-input"
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-span-12 mt-6 w-32 justify-self-center">
                <GenericButton buttonName={"Sign up"} />
              </div>
            </form>
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default ReataurantSignup;
