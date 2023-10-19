import React, { Fragment, useRef } from "react";
import { priceTestimonialCards } from "../constant";

const PriceTestimonial = () => {
  let monthlyRef = useRef(null);
  let annuallyRef = useRef(null);

  let flag = false;

  // function for toggling class
  function toggleIt() {
    if (monthlyRef.current === null && annuallyRef.current === null) return;
    if (!flag) {
      monthlyRef.current?.classList?.add("bg-orange-600");
      monthlyRef.current?.classList?.add("text-white");
      monthlyRef.current?.classList?.remove("bg-gray-100");
      monthlyRef.current?.classList?.remove("text-gray-600");
      annuallyRef.current?.classList?.remove("bg-orange-600");
      annuallyRef.current?.classList?.remove("text-white");
      annuallyRef.current?.classList?.add("bg-gray-100");
      annuallyRef.current?.classList?.add("text-gray-600");
      flag = true;
    } else {
      monthlyRef.current?.classList?.remove("bg-orange-600");
      monthlyRef.current?.classList?.remove("text-white");
      monthlyRef.current?.classList?.add("bg-gray-100");
      monthlyRef.current?.classList?.add("text-gray-600");
      annuallyRef.current?.classList?.add("bg-orange-600");
      annuallyRef.current?.classList?.add("text-white");
      annuallyRef.current?.classList?.remove("bg-gray-100");
      annuallyRef.current?.classList?.remove("text-gray-600");
      flag = false;
    }
  }
  return (
    <div className="2xl:px-0 px-6 py-20 xl:container xl:mx-auto">
      <div className="items-center justify-between lg:flex">
        <div className=" w-full lg:w-1/2">
          <p className="text-base font-semibold leading-4 text-orange-700">
            Choose your plan
          </p>
          <p className="mt-3 font-bold leading-10 text-gray-800 xs:text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Our pricing plan
          </p>
          <p
            role="contentinfo"
            className="mt-5 text-base leading-6 text-gray-600"
          >
            We’re working on a suit of tools to make managing complex systems
            easier, for everyone for free. we can’t wait to hear what you think
          </p>

          <div className="shadow mt-10 flex items-center justify-center gap-2 p-2">
            <button
              onClick={toggleIt}
              className="price-plan-button bg-gray-100 text-gray-600"
              ref={monthlyRef}
            >
              Monthly
            </button>
            <button
              onClick={toggleIt}
              className="price-plan-button bg-orange-600 text-white"
              ref={annuallyRef}
            >
              Annually
            </button>
          </div>
        </div>
        <div className="relative mt-12 w-full md:px-8 lg:mt-0 lg:w-7/12 xl:w-1/2">
          <img
            src="https://i.ibb.co/0n6DSS3/bgimg.png"
            className="absolute -ml-12 mt-24 w-full"
            alt="background circle images"
          />
          {priceTestimonialCards.map((card, index) => (
            <Fragment key={index}>
              {index === 0 ? (
                <div className="relative z-30 cursor-pointer rounded-lg bg-white p-8 shadow-lg transition-all delay-200 duration-200 hover:-translate-y-3">
                  <div className="items-center justify-between md:flex">
                    <h2 className="text-2xl font-semibold leading-6 text-gray-800">
                      {card.cardHeader}
                    </h2>
                    <p className="mt-4 text-2xl font-semibold leading-6 text-gray-800 md:mt-0">
                      {card.cardPrice}
                    </p>
                  </div>
                  <p className="md:w-80 mt-4 text-base leading-6 text-gray-600">
                    {card.cardDescription}
                  </p>
                </div>
              ) : (
                <div className="relative z-30 mt-6 flex cursor-pointer rounded-lg bg-white shadow-lg transition-all delay-200 duration-200 hover:-translate-y-3">
                  <div className="h-auto w-1 rounded-bl-md rounded-tl-md bg-orange-600" />
                  <div className="w-full p-8">
                    <div className="items-center justify-between md:flex">
                      <h2 className="text-2xl font-semibold leading-6 text-gray-800">
                        {card.cardHeader}
                      </h2>
                      <p className="mt-4 text-2xl font-semibold leading-6 text-gray-800 md:mt-0">
                        {card.cardPrice}
                        <span className="text-base font-normal">
                          {card.cardPriceSpan}
                        </span>
                      </p>
                    </div>
                    <p className="md:w-80 mt-4 text-base leading-6 text-gray-600">
                      {card.cardDescription}
                    </p>
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceTestimonial;
