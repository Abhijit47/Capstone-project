import React, { Fragment } from "react";

const HowItWorks = () => {
  const data = [
    {
      id: "01",
      heading: "Tell us what you like (and what not)",
      description:
        "Never again waste time thinking about what to eat! Omnifood AI will create a 100% personalized weekly meal plan just for you. It makes sure you get all the nutrients and vitamins you need, no matter what diet you follow!",
      imageURL: "https://omnifood.dev/img/app/app-screen-1.png",
    },
    {
      id: "02",
      heading: "Approve your weekly meal plan",
      description:
        "Once per week, approve the meal plan generated for you by Omnifood AI. You can change ingredients, swap entire meals, or even add your own recipes.",
      imageURL: "https://omnifood.dev/img/app/app-screen-2.png",
    },
    {
      id: "03",
      heading: "Receive meals at convenient time",
      description:
        "Best chefs in town will cook your selected meal every day, and we will deliver it to your door whenever works best for you. You can change delivery schedule and address daily!",
      imageURL: "https://omnifood.dev/img/app/app-screen-3.png",
    },
  ];
  return (
    <section className="h-auto bg-white p-6 xs:p-12">
      <div>
        <h3 className="font-sans font-semibold text-orange-700 xs:font-bold">
          HOW IT WORKS
        </h3>
        <p className="font-medium text-gray-800 xs:text-2xl xs:font-bold sm:text-3xl md:text-4xl lg:text-5xl">
          Your daily dose of health in 3 simple steps
        </p>
      </div>

      <div>
        {data.map((item, index) => (
          <Fragment key={index}>
            {index === 1 ? (
              <div className="p-2 xs:p-8">
                <div className="grid justify-items-center gap-6 xs:gap-8 lg:grid-cols-2">
                  <div className="order-last xs:order-last sm:order-last md:order-last lg:order-first">
                    <img
                      src={item.imageURL}
                      alt={item.id}
                      className="h-[14rem] xs:h-[15rem] md:h-[18rem] lg:h-[20rem]"
                    />
                  </div>
                  <div>
                    <h4 className="text-3xl font-extrabold text-orange-300 xs:text-4xl lg:text-6xl">
                      {item.id}
                    </h4>
                    <h5 className="text-lg font-bold text-gray-800 xs:text-xl xs:font-medium lg:text-3xl">
                      {item.heading}
                    </h5>
                    <p className="font-normal text-gray-700 xs:text-sm xs:font-normal xs:leading-6 lg:text-lg lg:leading-8">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-2 xs:p-8">
                <div className="grid justify-items-center gap-8 lg:grid-cols-2">
                  <div>
                    <h4 className="text-3xl font-extrabold text-orange-300 xs:text-4xl lg:text-6xl">
                      {item.id}
                    </h4>
                    <h5 className="text-lg font-bold text-gray-800 xs:text-xl xs:font-medium lg:text-3xl">
                      {item.heading}
                    </h5>
                    <p className="font-normal text-gray-700 xs:text-sm xs:font-normal xs:leading-6 lg:text-lg lg:leading-8">
                      {item.description}
                    </p>
                  </div>
                  <div>
                    <img
                      src={item.imageURL}
                      alt={item.id}
                      className="h-[14rem] xs:h-[15rem] md:h-[18rem] lg:h-[20rem]"
                    />
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
