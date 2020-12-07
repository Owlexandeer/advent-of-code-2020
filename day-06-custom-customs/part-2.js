const lines = require("../filereader.js").readFile(/(^[ \t]*\n)/gm, false);

const totalYesAnswers = lines
  .filter(line => line != "\n") // filter out extra, empty lines
  .map(line => line.split(/\n/g)) // split into groups of responses
  .map(group => group.filter(responses => responses != "")) // get rid of empty responses
  .map(group => {
    const responses = group.map(responses => new Set(responses.split("")));
    let yesAnswers = new Set();

    responses.forEach(setofAnswers => {
      if (group.length == 1) {
        setofAnswers.forEach(answer => yesAnswers.add(answer));
      } else {
        setofAnswers.forEach(answer => {
          const everySetOfAnswersHasAnswer = responses
            .map(setOfAnswers => setOfAnswers.has(answer))
            .reduce((a, b) => a && b);

          if (everySetOfAnswersHasAnswer) yesAnswers.add(answer);
        });
      }
    });

    return yesAnswers;
  })
  .map(yesAnswers => yesAnswers.size)
  .reduce((a, b) => a + b);

console.log(totalYesAnswers);
