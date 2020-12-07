const lines = require("../filereader.js").readFile(/(^[ \t]*\n)/gm, false);

const result = lines
  .filter(line => line != "\n")
  .map(line => line.replace(/\n/g, ""))
  .map(allAnswers => new Set([...allAnswers]))
  .map(answers => answers.size)
  .reduce((a, b) => a + b);

console.log(result);
