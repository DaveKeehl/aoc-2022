const text = await Deno.readTextFile('./input.txt');
const sample = `
30373
25512
65332
33549
35390
`.trim();

const input = text;

const lines = input.split('\n').map((line) => Array.from(line.split('').map((num) => +num)));
const scenicScores: number[] = [];

const getVisibleTrees = (numArray: number[], cur: number, reverse = false) => {
  const visibleTrees = [];

  for (let k = 0; k < numArray.length; k++) {
    const arr = reverse ? numArray.toReversed() : numArray;

    visibleTrees.push(arr[k]);

    if (arr[k] >= cur) {
      break;
    }
  }

  return visibleTrees;
};

for (let i = 0; i < lines.length; i++) {
  const horizontal = lines[i];

  for (let j = 0; j < lines[i].length; j++) {
    const cur = lines[i][j];

    const vertical = lines.map((line) => line[j]);

    const left = horizontal.slice(0, j);
    const right = horizontal.slice(j + 1);
    const top = vertical.slice(0, i);
    const bottom = vertical.slice(i + 1);

    const visibleFromLeft = getVisibleTrees(left, cur, true);
    const visibleFromRight = getVisibleTrees(right, cur);
    const visibleFromTop = getVisibleTrees(top, cur, true);
    const visibleFromBottom = getVisibleTrees(bottom, cur);

    scenicScores.push(
      visibleFromLeft.length *
        visibleFromRight.length *
        visibleFromTop.length *
        visibleFromBottom.length
    );
  }
}

console.log(Math.max(...scenicScores));
