const passports = require("../filereader.js").readPassport();

const validators = {
  byr: byr,
  cid: cid,
  ecl: ecl,
  eyr: eyr,
  hcl: hcl,
  hgt: hgt,
  iyr: iyr,
  pid: pid
};

const requiredFieldNames = new Set([
  "byr",
  "ecl",
  "eyr",
  "hcl",
  "hgt",
  "iyr",
  "pid"
]);

const numOfValidPassports = passports
  .map(passport => passport.split(" "))
  .filter(fields => {
    const fieldNames = new Set(fields.map(x => x.split(":")[0]));

    let diff = new Set(
      [...requiredFieldNames].filter(name => !fieldNames.has(name))
    );

    let allFieldsPresent =
      diff.size == 0 || (diff.size == 0 && !fieldNames.has("cid"));

    if (allFieldsPresent) {
      // Validate field values
      return fields
        .map(x => x.split(":"))
        .map(x => validators[x[0]](x[1]))
        .reduce((a, b) => a & b);
    }

    return false;
  }).length;

console.log(numOfValidPassports);

// Validators

function cid(cid) {
  return true;
}

function byr(byr) {
  return byr.toString().length == 4 && byr >= 1920 && byr <= 2002;
}

function iyr(iyr) {
  return iyr.toString().length == 4 && iyr >= 2010 && iyr <= 2020;
}
function eyr(eyr) {
  return eyr.toString().length == 4 && eyr >= 2020 && eyr <= 2030;
}

function hgt(hgt) {
  if (RegExp("\\d+(cm|in)").test(hgt) == false) {
    return false;
  }

  let value = RegExp("\\d+").exec(hgt);
  let unit = RegExp("cm|in").exec(hgt);

  return (
    (unit == "cm" && value >= 150 && value <= 193) ||
    (unit == "in" && value >= 59 && value <= 76)
  );
}

function hcl(hcl) {
  return RegExp("#([0-9a-fA-F]{6})").test(hcl);
}

function ecl(ecl) {
  let colours = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  return colours.includes(ecl);
}

function pid(pid) {
  return RegExp("^\\d{9}$").test(pid);
}
