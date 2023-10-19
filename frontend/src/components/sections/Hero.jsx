import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Hero = () => {
  const notify = () => toast("Wow so easy !");
  return (
    <section className="container mx-auto">
      <div className="flex flex-col items-center xs:flex-col sm:flex-col md:flex-col lg:flex-row lg:gap-12">
        <div className="px-8 py-5 text-center xs:px-16 xs:py-10">
          <h1 className="mb-4 font-sans text-2xl font-medium text-gray-800 xs:text-2xl xs:font-semibold sm:text-3xl sm:font-semibold md:text-4xl md:font-semibold lg:text-4xl lg:font-bold xl:text-5xl">
            A healthy meal delivered to your door, every single day
          </h1>
          <p className="mb-8 text-sm leading-relaxed xs:text-sm xs:font-normal lg:font-medium">
            The smart 365-days-per-year food subscription that will make you eat
            healthy again. Tailored to your personal tastes and nutritional
            needs.
          </p>
          <div className="flex items-center justify-between sm:justify-center sm:gap-4 md:justify-center md:gap-4">
            <div className="w-9/12 text-left xs:w-9/12 sm:w-7/12 md:w-8/12 lg:w-8/12 xl:w-9/12">
              <label
                htmlFor="hero-field"
                className="sr-only text-sm leading-7 text-gray-600"
              >
                Email address
              </label>
              <input
                type="email"
                id="hero-field"
                name="hero-field"
                className="form-input placeholder:text-gray-600 focus:ring-orange-600"
                autoComplete="email"
                placeholder="Your Email Address"
              />
            </div>
            <div>
              <Link
                to={"/login"}
                className="inline-flex rounded-md border-0 bg-orange-600 px-2 py-1 text-sm capitalize text-white hover:bg-orange-500 focus:outline-none xs:px-4 xs:py-2 xs:text-base"
              >
                sign in
              </Link>
            </div>
          </div>

          <p className="mb-8 mt-2 w-full text-sm text-gray-800">
            We never share your email.
          </p>
          <div className="flex justify-center gap-2 text-gray-100 xs:gap-4 lg:flex-row">
            <button
              onClick={notify}
              className="hero_btn px-4 py-2 xs:px-2 xs:py-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="h-5 w-5 xs:h-5 xs:w-5 lg:h-6 lg:w-6"
                viewBox="0 0 512 512"
              >
                <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
              </svg>
              <span className="ml-2 flex flex-col items-start leading-none xs:ml-4">
                <span className="mb-1 text-[0.6rem] text-gray-100 xs:text-xs">
                  GET IT ON
                </span>
                <span className="text-[0.8rem] font-normal xs:font-medium">
                  Google Play
                </span>
              </span>
            </button>
            <button
              onClick={notify}
              className="hero_btn bg-orange-200 px-4 py-2 text-orange-600 ring-1 ring-orange-500 hover:text-gray-100 xs:px-2 xs:py-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="h-5 w-5 xs:h-5 xs:w-5 lg:h-6 lg:w-6"
                viewBox="0 0 305 305"
              >
                <path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z"></path>
                <path d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z"></path>
              </svg>
              <span className="ml-2 flex flex-col items-start leading-none transition-all delay-75 duration-75 hover:text-gray-100 xs:ml-4">
                <span className="mb-1 text-[0.6rem] xs:text-xs">
                  Download on the
                </span>
                <span className="text-[0.8rem] font-normal xs:font-medium">
                  App Store
                </span>
              </span>
            </button>
          </div>
        </div>
        <div className="mt-6 w-7/12 xs:w-9/12 xs:p-10 sm:w-8/12 md:w-7/12 lg:w-11/12 lg:p-12">
          <img
            className="w-full object-cover object-center"
            alt="hero"
            src={require("../../assets/images/hero.webp")}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
