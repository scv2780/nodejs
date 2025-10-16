// path.js

const path = require("path");

console.log(__filename);
// console.log(path.basename(__filename));
// console.log(path.basename(__filename, ".js"));

// console.log(path.delimiter);
// console.log(process.env.path);
// console.log(process.env.PATH.split(path.delimiter));

// console.log(path.dirname(__filename));

// console.log(path.extname("index.html"));

// console.log(
//   path.format({
//     root: "/ignored",
//     dir: "/Dev/git/nodejs/2",
//     base: "stderr.txt",
//   })
// );

// let par = path.parse("D:/Dev/git/nodejs/2/path.js");
// console.log(par);

// console.log(path.sep);
// par = "foo\\bar\\baz".split(path.sep);
// console.log(par);

const myURL = new URL(
  "https://www.youtube.com/watch?v=7fZxBvmKcN4&list=RD7fZxBvmKcN4&user=rfdtrs&start_radio=1"
);
// console.log(myURL);

// myURL.pathname = "/watching";
// console.log(myURL.pathname);

console.log(myURL.searchParams.get("user"));
console.log(myURL.searchParams.keys());
