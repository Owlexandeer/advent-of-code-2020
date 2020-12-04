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

    let indices = [];

    for (let i = 0; i < password.length; i++) {
      if (password[i] === letter) {
        const index = i + 1;
        indices.push(index.toString());
      }
    }

    return indices.includes(policy[0])
      ? !indices.includes(policy[1])
      : indices.includes(policy[1]);
  });

console.log(valid.length + "/" + lines.length);
