import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  BuildingStorefrontIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { starPrint } from "../features/starPrint";
import { timeFormatter } from "../features/timeFormatter";

const AllRestaurentCards = ({ restaurantsData }) => {
  return (
    <Fragment>
      <div className="grid gap-6 p-6 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {restaurantsData?.map((restaurant, index) => (
          <div key={index}>
            <div className="sm:h-80 lg:h-96 group relative block h-64">
              <span className="absolute inset-0 border-2 border-dashed border-orange-500"></span>
              <div className="relative flex h-full transform items-end border-2 border-orange-500 bg-white transition-transform delay-200 duration-200 group-hover:-translate-x-2 group-hover:-translate-y-2">
                <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
                  <BuildingStorefrontIcon className="h-10 w-10 text-orange-400 sm:h-8 sm:w-8" />
                  <h2 className="mt-4 text-xl font-medium text-orange-500 sm:text-2xl">
                    {restaurant.name}
                  </h2>
                  <address className="flex items-center gap-2">
                    <MapPinIcon className="h-6 w-6 text-orange-500 sm:h-4 sm:w-4" />
                    {restaurant.address}
                  </address>
                  <p className="flex items-center gap-2">
                    <span>{starPrint(restaurant.rating)}</span>
                    <span>{restaurant.rating}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>{timeFormatter(restaurant.openingTime)}AM</span>
                    <span>{timeFormatter(restaurant.closingTime)}PM</span>
                  </p>
                  <p>
                    {restaurant?.cuisine?.map((type, idx) => (
                      <span key={idx}>{type}</span>
                    ))}
                  </p>
                </div>

                <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
                  <h3 className="mt-4 text-xl font-medium text-orange-500 sm:text-2xl">
                    Our Menus
                  </h3>
                  <div className="mt-6 grid grid-cols-4">
                    {restaurant?.menu?.slice(0, 4).map((item, i) => (
                      <div className="flex flex-col items-center gap-2" key={i}>
                        <div className="flex h-16 w-16 object-cover">
                          <img
                            className="h-full w-full rounded-sm"
                            src={item.picture}
                            alt={item.itemName}
                          />
                        </div>
                        <p className="text-sm">{item.itemName}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    to={"/all-meals"}
                    className="mt-8 border-orange-300 font-bold hover:border-b-2"
                  >
                    See more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default AllRestaurentCards;
