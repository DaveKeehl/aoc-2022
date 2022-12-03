const text = await Deno.readTextFile('./input.txt');

const rucksacks = text.split('\n');

const groups: string[][] = [];
const GROUP_SIZE = 3;

for (let i = 0; i < rucksacks.length; i += GROUP_SIZE) {
  groups.push(rucksacks.slice(i, i + GROUP_SIZE));
}

const prioritiesSum = groups.reduce((sum, group) => {
  const sortedRucksacks = group.sort((r1, r2) => r2.length - r1.length);

  const commonItems = Array.from(
    sortedRucksacks[0].split('').reduce((duplicateItems, char) => {
      const isInSecondRucksack = sortedRucksacks[1].split('').includes(char);
      const isInThirdRucksack = sortedRucksacks[2].split('').includes(char);

      if (isInSecondRucksack && isInThirdRucksack) {
        return new Set([...duplicateItems, char]);
      }

      return duplicateItems;
    }, new Set<string>())
  );

  const groupPriority = commonItems.reduce((acc, char) => {
    const isLowercase = char.toLowerCase() === char;
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const alphaIdx = alphabet.split('').indexOf(char.toLowerCase()) + 1;
    const priority = isLowercase ? alphaIdx : alphaIdx + 26;
    return acc + priority;
  }, 0);

  return sum + groupPriority;
}, 0);

console.log(prioritiesSum);
