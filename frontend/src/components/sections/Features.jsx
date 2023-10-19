import React from "react";
import { featureImages } from "../../constant/index";

const Features = () => {
  return (
    <section className="mt-6 flex flex-col justify-center gap-8 px-6 py-4 xs:px-8 xs:py-12">
      <h3 className="text-center text-xs font-semibold text-gray-600 sm:text-sm lg:text-lg">
        AS FEATURED IN
      </h3>
      <div className="grid grid-cols-5 xs:gap-2 lg:gap-4">
        {featureImages.map((feature, index) => (
          <div
            className="flex h-32 cursor-pointer rounded-lg p-2"
            key={index + 1}
          >
            <img
              className="m-auto aspect-video h-20 object-scale-down opacity-50 brightness-0"
              src={feature.imageUrl}
              alt={feature.companyName}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
