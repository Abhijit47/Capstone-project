import React from "react";
import { Link } from "react-router-dom";
import { footerButtomLinks, footerIcons, footerLinks } from "../constant";

const Footer = () => {
  return (
    <footer>
      {/* <div className="mx-auto max-w-screen-xl px-3 py-8 xs:px-4 xs:py-16 sm:px-6 lg:px-8"> */}
      <div className="mt-16">
        <div className="justify-center lg:flex lg:items-start lg:gap-8">
          <div className="mt-8 grid grid-cols-10 justify-items-center xs:gap-y-6 lg:mt-0 lg:gap-y-8">
            {/* footer links */}
            {footerLinks.map((footerLink, index) => (
              <div
                className={`col-span-10 cursor-pointer p-6 sm:col-span-5 lg:col-span-2 ${
                  !index === 3 && !index === 4
                    ? "md:col-span-3"
                    : "md:col-span-5"
                }`}
                key={index}
              >
                <p className="font-medium text-gray-900 hover:text-orange-400">
                  {footerLink.footerHeader}
                </p>
                <ul className="mt-6 flex flex-col gap-4 text-sm">
                  {footerLink.footerLinks.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        to={`/${link?.toLowerCase().replace(" ", "-")}`}
                        className="transition text-gray-700 hover:text-orange-400"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* footer icons */}
            <ul className="col-span-12 flex gap-x-6">
              {footerIcons.map((footerIcon, index) => (
                <li className="p-2" key={index}>
                  <Link
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    className="transition text-gray-700 hover:text-orange-400"
                  >
                    <span className="sr-only">{footerIcon.iconName}</span>

                    {<footerIcon.icon />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* footer buttom links */}
        <div className="mt-4 flex flex-col items-center gap-3 border-t-2 border-orange-400 p-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()}. Omnifood.com. All rights
            reserved.
          </p>

          {/* footer bottom links */}
          <ul className="mt-8 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end">
            {footerButtomLinks.map((buttomLink, index) => (
              <li key={index}>
                <Link
                  to={buttomLink.link}
                  className="transition text-gray-500 hover:opacity-75"
                >
                  {buttomLink.linkName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* <div className="mx-auto max-w-screen-xl px-3 py-8 xs:px-4 xs:py-16 sm:px-6 lg:px-8">
        <div className="justify-center lg:flex lg:items-start lg:gap-8">
          <div className="mt-8 grid justify-items-center gap-8 xs:grid-cols-2 lg:mt-0 lg:gap-y-8">
            {footerLinks.map((footerLink, index) => (
              <div
                className="col-span-2 cursor-pointer p-12 xs:col-span-1"
                key={index}
              >
                <p className="font-medium text-gray-900 hover:text-orange-400">
                  {footerLink.footerHeader}
                </p>
                <ul className="mt-6 flex flex-col gap-4 text-sm">
                  {footerLink.footerLinks.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        to={`/${link?.toLowerCase()}`}
                        className="transition text-gray-700 hover:text-orange-400"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <ul className="col-span-2 flex justify-start gap-6 p-4 lg:col-span-5 lg:justify-end">
              {footerIcons.map((footerIcon, index) => (
                <li key={index}>
                  <Link
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    className="transition text-gray-700 hover:text-orange-400"
                  >
                    <span className="sr-only">{footerIcon.iconName}</span>

                    {<footerIcon.icon />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 border-gray-100 pt-8">
          <div className="sm:flex sm:justify-between">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()}. Omnifood.com. All rights
              reserved.
            </p>

            <ul className="mt-8 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end">
              <li>
                <Link
                  to="#"
                  className="transition text-gray-500 hover:opacity-75"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="transition text-gray-500 hover:opacity-75"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="transition text-gray-500 hover:opacity-75"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;
