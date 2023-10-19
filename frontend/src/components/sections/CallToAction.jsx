import React from "react";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section>
      <div className="2xl:mx-auto 2xl:container py-9 px-4 md:px-20 md:py-12">
        <div className="relative rounded-md">
          <img
            src={require("../../assets/images/CTA.jpg")}
            alt="food view"
            loading="lazy"
            className="absolute hidden h-full w-full rounded-md object-cover  sm:block"
          />
          <img
            src={require("../../assets/images/CTA.jpg")}
            alt="food view"
            loading="lazy"
            className="absolute h-full w-full rounded-md object-cover sm:hidden"
          />
          <div className="relative top-0 z-20 flex h-full w-full flex-col justify-between gap-y-8 rounded-md bg-gradient-to-r from-orange-700 to-transparent p-6 text-xl md:p-8 lg:p-16">
            <div className="flex flex-col gap-y-6">
              <h5 className="w-64 font-bold leading-9 text-white xs:text-xl sm:w-auto sm:text-2xl md:text-3xl md:leading-10 lg:text-3xl">
                Act Before It’s Too Late!
              </h5>
              <p className="text-lg leading-6 text-white md:w-10/12  lg:w-8/12 xl:w-5/12">
                A good idiom for kids is "It's raining cats and dogs." Kids know
                what both cats and dogs are from an early age.
              </p>
            </div>
            <div className="">
              <Link
                to={"/contact-us"}
                className="w-full rounded-md bg-white p-3 text-[0.6rem] font-medium leading-4 text-orange-700 shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 xs:p-4 xs:text-xs sm:w-auto sm:text-sm lg:p-4 lg:text-base"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
