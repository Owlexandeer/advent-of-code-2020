const passports = require("../filereader.js").readPassport();

const requiredFieldNames = new Set([
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid"
]);

const numOfValidPassports = passports
  .map(passport => passport.split(" "))
  .map(fields => fields.map(field => field.split(":")[0]))
  .map(fieldNames => new Set(fieldNames))
  .filter(fieldNames => {
    let difference = new Set(
      [...requiredFieldNames].filter(field => !fieldNames.has(field))
    );
    return difference.size == 0;
  }).length;

console.log(numOfValidPassports);
