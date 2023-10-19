import React, { Fragment } from "react";

const FoodItemInputs = ({ foodItem, setFoodItem }) => {
  // destructuring form data
  const { itemName, quantity, price, description, picture } = foodItem;

  // define a function for handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodItem({ ...foodItem, [name]: value });
  };

  const formInputs = [
    {
      labelName: "item name",
      labelFor: "itemName",
      id: "itemName",
      name: "itemName",
      type: "text",
      placeholder: "Enter item name",
      value: itemName,
    },
    {
      labelName: "quantity",
      labelFor: "quantity",
      id: "quantity",
      name: "quantity",
      type: "text",
      placeholder: "Enter quantity",
      value: quantity,
    },
    {
      labelName: "price",
      labelFor: "price",
      id: "price",
      name: "price",
      type: "text",
      placeholder: " Enter price",
      value: price,
    },
    {
      labelName: "description",
      labelFor: "description",
      id: "description",
      name: "description",
      placeholder: "Enter item description",
      value: description,
    },
    {
      labelName: "picture",
      labelFor: "picture",
      id: "picture",
      name: "picture",
      type: "url",
      placeholder: "Enter item image url",
      value: picture,
      pattern: "https://.*",
      size: "30",
    },
  ];

  return (
    <Fragment>
      {formInputs.map((input, index) => (
        <Fragment key={index}>
          {index === 3 ? (
            <div className="col-span-6 sm:col-span-6">
              <label htmlFor={input.labelFor} className="form-label">
                {input.labelName}
              </label>
              <div className="mt-2">
                <textarea
                  name={input.name}
                  id={input.id}
                  className="form-input"
                  cols="30"
                  rows={5}
                  placeholder={input.placeholder}
                  value={input.value}
                  autoComplete="off"
                  required
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          ) : (
            <Fragment key={index}>
              <div
                className={`${
                  index === 0 || index === 1
                    ? "col-span-6 sm:col-span-3"
                    : "col-span-6 sm:col-span-3 sm:row-start-2"
                }`}
              >
                <label htmlFor={input.labelFor} className="form-label">
                  {input.labelName}
                </label>
                <div className="mt-2">
                  <input
                    id={input.id}
                    name={input.name}
                    type={input.type}
                    autoComplete="off"
                    placeholder={input.placeholder}
                    required
                    pattern={index === -1 ? input.pattern : null}
                    className="form-input"
                    value={input.value}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default FoodItemInputs;
