// function for create stars
export const starPrint = (numOfStar) => {
  let star = [];
  for (let i = 1; i <= numOfStar; i++) {
    star.push("⭐");
  }
  return star;
};