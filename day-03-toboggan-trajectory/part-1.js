const lines = require("../filereader.js").readFile("\n", false);

let index = 1;
let treesHit = 0;

const result = lines
  .slice(1)
  .map(x => x.toString().split(""))
  .filter(line => {
    index = index + 3;

    if (index > line.length) {
      index = index - line.length;
    }

    return line[index - 1] == "#";
  });

console.log(result.length);
