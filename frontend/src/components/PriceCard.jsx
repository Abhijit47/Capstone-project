import React, { Fragment, useRef } from "react";
import { priceCards } from "../constant/index";

const PriceCard = () => {
  let monthlyBtnRef = useRef(null);
  let annuallyBtnRef = useRef(null);

  let flag = false;

  // function for toggling class
  const toggleClass = () => {
    if (!flag) {
      monthlyBtnRef.current?.classList?.add("bg-orange-600");
      monthlyBtnRef.current?.classList?.add("text-white");
      annuallyBtnRef.current?.classList?.remove("bg-orange-600");
      annuallyBtnRef.current?.classList?.remove("text-white");
      flag = true;
    } else {
      monthlyBtnRef.current?.classList?.remove("bg-orange-600");
      monthlyBtnRef.current?.classList?.remove("text-white");
      annuallyBtnRef.current?.classList?.add("bg-orange-600");
      annuallyBtnRef.current?.classList?.add("text-white");
      flag = false;
    }
  };

  return (
    <section className="body-font overflow-hidden text-gray-600">
      <div className="container mx-auto px-3 py-8 xs:px-5 xs:py-24">
        <div className="mb-20 flex w-full flex-col text-center">
          <h1 className="title-font mb-2 text-2xl font-medium text-gray-900 xs:text-xl sm:text-4xl">
            Pricing
          </h1>
          <p className="mx-auto text-base leading-relaxed text-gray-700 lg:w-2/3">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical.
          </p>
          <div className="mx-auto mt-6 flex overflow-hidden rounded-md border-2 border-orange-500">
            <button
              onClick={toggleClass}
              ref={monthlyBtnRef}
              className="bg-orange-600 px-4 py-1 text-white focus:outline-none"
            >
              Monthly
            </button>
            <button
              onClick={toggleClass}
              className="px-4 py-1 focus:outline-none"
              ref={annuallyBtnRef}
            >
              Annually
            </button>
          </div>
        </div>
        <div className="-m-4 flex flex-wrap">
          {priceCards.map((card, index) => (
            <Fragment key={index}>
              {index === 1 ? (
                <div
                  className="w-full cursor-pointer p-4 transition-all delay-200 duration-200 hover:-translate-y-3 md:w-1/2 xl:w-1/4"
                  key={index}
                >
                  <div className="relative flex h-full flex-col overflow-hidden rounded-lg border-2 border-orange-500 p-6">
                    <span className="rounded-bl absolute right-0 top-0 bg-orange-600 px-3 py-1 text-xs tracking-widest text-white">
                      {card.cardTag}
                    </span>
                    <h2 className="title-font mb-1 text-sm font-medium tracking-widest">
                      {card.cardHeadingSecondary}
                    </h2>
                    <h1 className="mb-4 flex items-center border-b-2 border-orange-200 pb-4 leading-none text-gray-900 xs:text-2xl sm:text-3xl lg:text-5xl">
                      <span>{card.cardHeadingPrimarySpan1}</span>
                      <span className="ml-1 text-lg font-normal text-gray-500">
                        {card.cardHeadingPrimarySpan2}
                      </span>
                    </h1>
                    {card.cardFeatures.map((feature, index) => (
                      <p
                        className="mb-6 flex items-center text-gray-700"
                        key={index + 1}
                      >
                        <span className="mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-orange-400 text-white">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            className="h-3 w-3"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 6L9 17l-5-5"></path>
                          </svg>
                        </span>
                        {feature}
                      </p>
                    ))}
                    <button className="price-card-btn bg-orange-600 hover:bg-orange-500">
                      {card.cardButton}
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="ml-auto h-4 w-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </button>

                    <p className="mt-3 text-xs text-gray-600">
                      {card.cardFooter}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-full p-4 md:w-1/2 xl:w-1/4">
                  <div
                    className="relative flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border-2 border-orange-300 p-6 transition-all delay-200 duration-200 hover:-translate-y-3"
                    key={index}
                  >
                    <h2 className="title-font mb-1 text-sm font-medium tracking-widest">
                      {card.cardHeadingSecondary}
                    </h2>
                    <h1 className="mb-4 border-b-2 border-orange-200 pb-4 leading-none text-gray-900 xs:text-2xl sm:text-3xl lg:text-5xl">
                      {card.cardHeadingPrimary}
                    </h1>

                    {card.cardFeatures.map((feature, index) => (
                      <p
                        className="mb-6 flex items-center text-gray-700"
                        key={index}
                      >
                        <span className="mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-orange-400 text-white">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            className="h-3 w-3"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 6L9 17l-5-5"></path>
                          </svg>
                        </span>
                        {feature}
                      </p>
                    ))}
                    <button className="price-card-btn">
                      {card.cardButton}
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="ml-auto h-4 w-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </button>
                    <p className="mt-3 text-xs text-gray-600">
                      {card.cardFooter}
                    </p>
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PriceCard;
