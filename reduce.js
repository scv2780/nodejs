// Array.prototype.reduce();
// reduce(function() { ... })
import { studentAry, PI } from "./data.js";
// import => 다른 파일에서 내보낸 것을 받아온다

// 1,3,5번째 위치값.
const evenAry = (acc, elem, idx, ary) => {
  console.log(`acc: ${acc}, elem: ${elem}`);
  if (idx % 2 == 0) {
    acc.push(elem); // [1,3,5]
  }
  return acc;
};
let result = [1, 2, 3, 4, 5].reduce(evenAry, []);
console.log(`결과: ${result}`);

// 누적합
const sumAry = (acc, elem) => {
  return acc + elem;
};
// let result = [1, 2, 3, 4, 5].reduce(sumAry, 0);
// console.log(`결과: ${result}`);

// 최대값
// console.clear();
result = [23, 11, 56, 33, 47].reduce(function (acc, elem, idx) {
  console.log(`idx: ${idx}, acc: ${acc}, elem: ${elem}`);
  // acc, elem 큰 값을 반환.
  return acc > elem ? acc : elem;
}, 0);
console.log(`최대값: ${result}`);

// 최소값
console.clear();
result = [23, 11, 56, 33, 47].reduce(function (acc, elem, idx) {
  console.log(`idx: ${idx}, acc: ${acc}, elem: ${elem}`);
  // acc, elem 큰 값을 반환.
  return acc < elem ? acc : elem;
}, 999);
console.log(`최소값: ${result}`);

console.log(studentAry, PI);

// 60점 이상 패스한 사람만 배열에 저장.
console.clear();
result = studentAry.reduce(function (acc, elem) {
  // console.log(acc, elem);
  if (elem.score >= 60) {
    acc.push(elem);
  }
  return acc;
}, []);
console.table(result);

// 중복된 값 빼기
// console.clear();
// const numAry = [23, 12, 45, 87, 12, 45];
// result = numAry.reduce(function (acc, elem) {
//   console.log(acc, elem);
//   if (!acc.includes(elem)) {
//     acc.push(elem);
//   }
//   return acc;
// }, []);
// console.log(result);

console.clear();
const numAry = [23, 12, 45, 87, 12, 45];
result = numAry.reduce(function (acc, elem) {
  // console.log(`acc: ${acc}, elem: ${elem}`);
  let exists = acc.reduce(function (acc2, elem2) {
    console.log(`acc2: ${acc2}, elem2: ${elem2}`);
    return acc2 || elem2 == elem;
  }, false);

  if (!exists) {
    acc.push(elem);
  }

  return acc;
}, []);
console.log(result);
