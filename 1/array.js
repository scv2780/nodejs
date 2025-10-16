// Array.prototype.sort(); sort()는 문자열 기준 배열 가나다순 정렬
"abc".split("").sort();
// ['a','b','c'].sort();
let fruits = ["banana", "apple", "mango"];
console.log(fruits.sort());

let points = [2, 14, 10, 100, 1];
points.sort(function (a, b) {
  // 오름차순: -값을 반환.
  // console.log(a, b);
  // return a - b;
  // 내림차순: +값을 반환.
  // console.log(a, b);
  // return b - a;
  // 또는 if문으로도 가능.
  if (a > b) {
    // 오름차순
    return 1;
  } else {
    return -1;
  }
});
console.log(points);

const students = [];
students.push({ sno: 100, sname: "홍길동", score: 78 });
students.push({ sno: 200, sname: "김찬성", score: 55 });
students.push({ sno: 300, sname: "박인규", score: 95 });

students.sort(function (a, b) {
  if (a.score < b.score) {
    return -1;
  } else {
    return 1;
  }
});
console.log(students);

// filter(function(요소,인덱스,배열){}) => 조건을 만족하는 배열.
let result = students.filter((elem) => elem.score < 80);
console.log(result);

// map(function) => 메핑(A - A') 학생번호+이름+점수 => 학생번호+이름+통과
result = students.map(function ({ sno, sname, score }) {
  // { sno, sname, sore } = elem
  const obj = {};
  obj.no = sno;
  obj.name = sname;
  obj.pass = score >= 60 ? "P" : "F";
  return obj;
});
console.log(result);
