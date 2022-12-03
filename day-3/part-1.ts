const text = await Deno.readTextFile('./input.txt');

const prioritiesSum = text.split('\n').reduce((sum, rucksack) => {
  const comp1 = rucksack.slice(0, rucksack.length / 2);
  const comp2 = rucksack.slice(rucksack.length / 2);

  const commonItems = Array.from(
    comp1.split('').reduce((duplicateItems, char) => {
      return comp2.split('').includes(char) ? new Set([...duplicateItems, char]) : duplicateItems;
    }, new Set<string>())
  );

  const rucksackPrioritiesSum = commonItems.reduce((acc, char) => {
    const isLowercase = char.toLowerCase() === char;
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const alphaIdx = alphabet.split('').indexOf(char.toLowerCase()) + 1;
    const priority = isLowercase ? alphaIdx : alphaIdx + 26;
    return acc + priority;
  }, 0);

  return sum + rucksackPrioritiesSum;
}, 0);

console.log(prioritiesSum);
