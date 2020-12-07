const lines = require("../filereader.js").readFile("\n", false);

let result = Array.from({ length: 8 }, (x, i) => i)
  .filter(x => x % 2 != 0) // keep odd
  .map(x => detectCollisions(x))
  .reduce((x, y) => x * y);

console.log(result * detectCollisions(1, 2, true));

function detectCollisions(
  horizontalMovement,
  numOfLinesToSkip = 1,
  skipEnabled = false
) {
  let index = 1;
  let y = 1;
  let count = 0;

  const result = lines
    .slice(1)
    .map(x => x.toString().split(""))
    .filter(x => {
      if (skipEnabled) {
        let shouldSkip = y % 2 == 0;
        y += 1;
        return shouldSkip;
      }
      return true;
    })
    .filter(line => {
      count += 1;
      index = index + horizontalMovement;

      if (index > line.length) {
        index = index - line.length;
      }

      return line[index - 1] == "#";
    });

  return result.length;
}
