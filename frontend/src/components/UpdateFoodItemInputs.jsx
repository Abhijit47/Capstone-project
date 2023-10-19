import React, { Fragment } from "react";

const UpdateFoodItemInputs = ({ mealData, foodItem, setFoodItem }) => {
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
      placeholder: mealData.itemName ? mealData.itemName : "",
      value: itemName,
    },
    {
      labelName: "quantity",
      labelFor: "quantity",
      id: "quantity",
      name: "quantity",
      type: "text",
      placeholder: mealData.quantity ? mealData.quantity : "",
      value: quantity,
    },
    {
      labelName: "price",
      labelFor: "price",
      id: "price",
      name: "price",
      type: "text",
      placeholder: mealData.price ? mealData.price : "",
      value: price,
    },
    {
      labelName: "description",
      labelFor: "description",
      id: "description",
      name: "description",
      placeholder: mealData.description ? mealData.description : "",
      value: description,
    },
    {
      labelName: "picture",
      labelFor: "picture",
      id: "picture",
      name: "picture",
      type: "url",
      placeholder: mealData.picture ? mealData.picture : "",
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
            <div>
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
              {!index === -1 ? (
                <div>
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
                      className="form-input"
                      value={input.value}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label htmlFor={input.labelFor} className="form-label">
                    {input.labelName}
                  </label>
                  <div className="mt-2">
                    <input
                      id={input.id}
                      name={input.name}
                      type={input.type}
                      autoComplete="off"
                      pattern={input.pattern}
                      placeholder={input.placeholder}
                      size={input.size}
                      required
                      className="form-input"
                      value={input.value}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
            </Fragment>
          )}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default UpdateFoodItemInputs;
