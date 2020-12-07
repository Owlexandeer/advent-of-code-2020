const boardingPasses = require("../filereader.js").readFile("\n", false);

const result = boardingPasses.map(boardingPass => {
  let row = binary(boardingPass, 0, 127, "B", "F");
  let column = binary(boardingPass, 0, 7, "R", "L");
  return row * 8 + column;
});

console.log(Math.max(...result));

function binary(charArr, minValue, maxValue, lowerChar, upperChar) {
  let min = minValue;
  let max = maxValue;

  Array.from(charArr).map(x => {
    let midpoint = Math.floor((min + max) / 2);
    if (x == lowerChar) {
      min = midpoint;
    }
    if (x == upperChar) {
      max = midpoint;
    }
  });

  if (charArr.length % 2 == 0) {
    return charArr.slice(-1) == lowerChar ? min : max;
  } else {
    return max;
  }
}
