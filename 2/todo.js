// todo.js
// sampole.txt 단어 갯수 => ?개, 'e'문자가 포함된 => ?개

const fs = require("fs");

let data = fs.readFileSync("sample.txt", "utf-8");

let spl = data.split(" ");
let search = "e";

let espl = spl.reduce(function (acc, elem) {
  if (elem.includes(search)) {
    acc.push(elem);
  }
  return acc;
}, []);

console.log(`단어 갯수=> ${spl.length}`);
console.log(`'${search}' 문자가 포함된 갯수=> ${espl.length}`);
