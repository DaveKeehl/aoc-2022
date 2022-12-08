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

const edgeLength = lines.length * 2 + (lines[0].length - 2) * 2;
let visibleInnerTrees = 0;

for (let i = 1; i < lines.length - 1; i++) {
  const horizontal = lines[i];

  for (let j = 1; j < lines[i].length - 1; j++) {
    const vertical = lines.map((line) => line[j]);

    const left = horizontal.slice(0, j);
    const right = horizontal.slice(j + 1);
    const top = vertical.slice(0, i);
    const bottom = vertical.slice(i + 1);

    const isVisibleFromLeft = left.filter((el) => el >= lines[i][j]).length === 0;
    const isVisibleFromRight = right.filter((el) => el >= lines[i][j]).length === 0;
    const isVisibleFromTop = top.filter((el) => el >= lines[i][j]).length === 0;
    const isVisibleFromBottom = bottom.filter((el) => el >= lines[i][j]).length === 0;

    if (isVisibleFromLeft || isVisibleFromRight || isVisibleFromTop || isVisibleFromBottom) {
      visibleInnerTrees++;
    }
  }
}

const visibleTrees = edgeLength + visibleInnerTrees;
console.log(visibleTrees);
