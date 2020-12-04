const lines = require("../filereader.js").readFile("\n", false);

let count = 0;
const valid = lines
  .map(x => x.toString())
  .filter(x => {
    count++;
    const split = x.split(" ");

    const policy = split[0].split("-");
    const letter = split[1].slice(0, 1);
    const password = split[2];

    const numOfLetters = password.split("").filter(x => x == letter);

    return numOfLetters.length >= policy[0] && numOfLetters.length <= policy[1];
  });

console.log(valid.length);
