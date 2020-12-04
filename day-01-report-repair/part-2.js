const lines = require("../filereader.js").readFile();

const numbers = lines.filter(x => x < 2020).sort((a, b) => b - a);

let difference = 0;
let max = 0;
let min = 0;

for (let i of Array(numbers.length).keys()) {
  let mutable = numbers.slice(i);

  max = mutable[0];
  const second = mutable[mutable.length - 1];
  let sum = max + second;

  difference = 2020 - sum;

  if (new Set(mutable).has(difference)) {
    console.log(max * second * difference);
    break;
  }

  while (mutable.length > 1) {
    mutable = mutable.slice(1);

    const second = mutable[mutable.length - 1];
    let sum = max + second;

    difference = 2020 - sum;

    if (new Set(mutable).has(difference)) {
      console.log(max * second * difference);
      break;
    }
  }
}
