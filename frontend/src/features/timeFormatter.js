// function for format time
export const timeFormatter = (time) => {
  let inputString = time;
  return inputString = inputString.slice(0, 2) + ":" + inputString.slice(2);
};