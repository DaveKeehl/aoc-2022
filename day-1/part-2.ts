const text = await Deno.readTextFile('./input.txt');

const caloriesByElf = text.split('\n\n').map((elf) => elf.split('\n').map((calories) => +calories));

const sortedElvesByCalories = caloriesByElf.sort((elf1, elf2) => {
  const caloriesElf1 = elf1.reduce((prev, cur) => prev + cur);
  const caloriesElf2 = elf2.reduce((prev, cur) => prev + cur);
  return caloriesElf2 - caloriesElf1;
});

const top3ElvesTotalCalories = sortedElvesByCalories
  .slice(0, 3)
  .map((elf) => elf.reduce((prev, cur) => prev + cur))
  .reduce((prev, cur) => prev + cur);
console.log(top3ElvesTotalCalories);
