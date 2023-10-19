import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GenericButton from "../components/GenericButton";
import FormFooter from "../components/FormFooter";
import { useDispatch, useSelector } from "react-redux";
import { userSignIn } from "../redux/actions/userActions";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import _ from "lodash";
import { toast } from "react-toastify";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  // A hook to access the redux dispatch function.
  const dispatch = useDispatch();

  // to navigate other page
  const navigate = useNavigate();

  // destucture the userDetails
  const { email, password } = userDetails;

  // define a function to track input fields
  const handleChange = (e) => {
    // destructuring the event.target name and value
    const { name, value } = e.target;

    // set the name and value to corresponding field
    setUserDetails({ ...userDetails, [name]: value });
  };

  // define a function to handle form submit
  const handleSubmit = (e) => {
    // prevent the from default behaviour
    e.preventDefault();

    // dispatch signin action creator for login
    dispatch(
      userSignIn({
        userDetails,
        cb: (result) => {
          console.log(result);
          switch (result.status) {
            case 200:
              toast.success(result.data.status, {
                position: "top-center",
                autoClose: 500,
              });
              setUserDetails({ email: "", password: "" });
              navigate("/");
              break;
            case 400:
              toast.info(result.data.message, {
                position: "top-center",
                autoClose: 1500,
                bodyClassName: "w-full text-xs",
              });
              setUserDetails({ email: "", password: "" });
              navigate("/login");
              break;
            case 404:
              toast.info(result.data.message, {
                position: "top-center",
                autoClose: 500,
              });
              setUserDetails({ email: "", password: "" });
              navigate("/login");
              break;
            case 500:
              toast.error("Internal Server Error", {
                position: "top-center",
                autoClose: 500,
              });
              setUserDetails({ email: "", password: "" });
              navigate("/");
              break;
            default:
              toast.info("Something really going wrong", {
                position: "top-center",
                autoClose: 500,
              });
              setUserDetails({ email: "", password: "" });
              navigate("/");
              break;
          }
        },
      }),
    );
  };

  // A hook to access the redux store's state.
  const user = useSelector((state) => state.users.isLoading);

  const userToken = localStorage.getItem("user-token");

  // check user is already in logged in or not
  useEffect(() => {
    if (_.isNull(userToken)) {
      navigate("/login");
    } else {
      navigate("/user-profile");
    }
  }, [userToken, navigate]);

  return (
    <>
      {user.isLoading ? (
        <div className="h-64">
          <h3 className="bg-orange-500 text-center text-4xl">Loading...</h3>
        </div>
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <UserCircleIcon className="mx-auto h-20 w-20 text-orange-300" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              User Login
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit} method="POST">
              <div>
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

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-semibold text-orange-700 hover:text-orange-500"
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

              <GenericButton buttonName={"Sign in"} />
            </form>

            <FormFooter to={"/signup"} />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
