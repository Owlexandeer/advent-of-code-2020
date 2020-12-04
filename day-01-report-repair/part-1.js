const lines = require("../filereader.js").readFile();

const finished = lines.filter(x => x < 2020);

const linesSorted = lines.sort((a, b) => a - b);

const numbers = linesSorted;
let sum = 0;
let max = 0;
let min = 0;

for (let i of Array(numbers.length).keys()) {
  let mutable = numbers.slice(0, -i);

  sum = 0;
  max = Math.max(...mutable);
  min = Math.min(...mutable);
  sum = max + min;

  while (sum !== 2020 && mutable.length > 1) {
    mutable = mutable.slice(1);

    max = Math.max(...mutable);
    min = Math.min(...mutable);
    sum = max + min;
  }

  if (sum === 2020) {
    console.log(min * max);
    return;
  }

  mutable.pop();
}
