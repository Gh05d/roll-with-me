export const generateID = () => (Math.random() + 1).toString(36).slice(2, 10);

export function getResults(results) {
  let highestRoll;
  let lowestRoll;

  for (const result of Object.values(results)) {
    if (!highestRoll || result[result.length - 1] > highestRoll) {
      highestRoll = result[result.length - 1];
    }

    if (!lowestRoll || result[result.length - 1] < lowestRoll) {
      lowestRoll = result[result.length - 1];
    }
  }

  return { lowestRoll, highestRoll };
}
