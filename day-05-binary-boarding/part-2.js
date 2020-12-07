const boardingPasses = require("../filereader.js").readFile("\n", false);

const result = boardingPasses.map(boardingPass => {
  let row = binary(boardingPass, 0, 127, "B", "F");
  let column = binary(boardingPass, 0, 7, "R", "L");
  return row * 8 + column;
});

let difference = new Set(
  range(Math.min(...result), Math.max(...result)).filter(
    field => !new Set([...result]).has(field)
  )
);

console.log(difference);

function binary(charArr, minValue, maxValue, lowerChar, upperChar) {
  let min = minValue;
  let max = maxValue;

  Array.from(charArr).map(x => {
    if (x == lowerChar) {
      min = Math.round((min + max) / 2);
    }
    if (x == upperChar) {
      max = Math.floor((min + max) / 2);
    }
  });

  return charArr.slice(-1) == lowerChar ? min : max;
}

function range(start, end) {
  return new Array(end - start).fill().map((d, i) => i + start);
}
