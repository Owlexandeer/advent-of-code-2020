const rules = require("../filereader.js").readFile("\n", false);

const result4 = rules.map(x => {
  let container = x.split("contain");
  let containerRules = container[1].split(",");
  let parent = x.split("bags")[0];
  let rules = containerRules.map(x => x.trim().split(" bag")[0]);
  let ruleCount = rules
    .map(z => {
      let split = z.split(" ");

      if (split[0] != "no") {
        return {
          id: split[1] + " " + split[2],
          count: split[0],
          parentId: parent.trim()
        };
      }
    })
    .filter(x => x != null);

  ruleCount.push({
    id: parent.trim(),
    count: 1,
    parentId: null
  });
  return ruleCount;
});

let masterSet = new Set();

function findTotalGoldBags(node, nodes) {
  if (node.parentId == null) {
    masterSet.add(node.id);
    return masterSet;
  } else {
    let parentNode = nodes.filter(n => n.id == node.parentId);

    if (parentNode.length == 1) {
      masterSet.add(node.id);
      return findTotalGoldBags(parentNode[0], nodes, masterSet);
    } else {
      parentNode.forEach(x => findTotalGoldBags(x, nodes, masterSet));
    }
  }
}

const answer = result4
  .flat()
  .filter(x => x.id == "shiny gold")
  .forEach(x => findTotalGoldBags(x, result4.flat()));

console.log(masterSet.size - 1);
