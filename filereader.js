exports.readFile = (separator = "\n", toNumber = true) => {
  return require("fs")
    .readFileSync("input", "utf-8")
    .split(separator)
    .filter(Boolean)
    .map(n => (toNumber ? parseInt(n) : n));
};

exports.readMovements = (separator = "\n", toNumber = true) => {
  return require("fs")
    .readFileSync("input", "utf-8")
    .split(separator)
    .filter(Boolean);
};

exports.readPassport = () => {
  return require("fs")
    .readFileSync("input", "utf-8")
    .split(/(^[ \t]*\n)/gm)
    .map(x => x.toString())
    .map(x => x.replace(/\n/g, " "))
    .map(x => x.trim())
    .filter(x => x != "");
};
