import React from "react";
import GenericButton from "../components/GenericButton";
import FormFooter from "../components/FormFooter";
import { FingerPrintIcon } from "@heroicons/react/24/outline";

const ForgotPassword = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <FingerPrintIcon className="mx-auto h-10 w-10 text-orange-300 xs:h-10 xs:w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot your password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
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
              />
            </div>
          </div>

          <GenericButton buttonName={"Reset your password"} />
        </form>

        <FormFooter
          text={"Not forgot your password?"}
          to={"/login"}
          message={"Login here"}
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
