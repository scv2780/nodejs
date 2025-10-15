// todo.js
import { jsonString } from "./data.js";
let jsonObj = JSON.parse(jsonString);

// console.table(jsonObj);
// reduce 출력: Female => id, fullName, email, salary => resultAry
// 1, 'Ernestine', 'Stanner', 'estanner0@tmall.com', 9315

// console.clear();
// let resultAry = jsonObj
//   .reduce(function (acc, elem) {
//     // console.log(acc, elem);
//     if (elem.gender == "Female") {
//       acc.push(elem);
//     }
//     return acc;
//   }, [])
//   .map(function ({ id, first_name, last_name, email, salary }) {
//     const obj = {};
//     obj.id = id;
//     obj.fullName = first_name + last_name;
//     obj.email = email;
//     obj.salary = salary;
//     return obj;
//   });
// console.table(resultAry);

// 교수님 코드
// let resultAry = jsonObj
//   .reduce(function (acc, { id, first_name, last_name, email, gender, salary }) {
//     if (elem.gender == "Female") {
//       acc.push({id, fullName: first_name + " " + last_name, email, salary});
//     }
//     return acc;
//   }, [])

// jsonObj의 gender별 인원.
let resultAry = jsonObj.reduce(
  function (acc, elem) {
    switch (elem.gender) {
      case "Male":
        acc.Male.push(elem.first_name);
        break;
      case "Female":
        acc.Female.push(elem.first_name);
        break;
      case "Genderfluid":
        acc.Genderfluid.push(elem.first_name);
        break;
      case "Polygender":
        acc.Polygender.push(elem.first_name);
        break;
      case "Bigender":
        acc.Bigender.push(elem.first_name);
        break;
    }
    return acc;
  },
  { Male: [], Female: [], Genderfluid: [], Polygender: [], Bigender: [] }
);
console.table(resultAry);

// 교수님 코드
let resultAry2 = jsonObj.reduce((acc, elem) => {
  const key = elem["gender"];
  if (!acc[key]) {
    acc[key] = []; // {Male: [], Female: [],}
  }
  acc[key].push(elem.first_name);
  return acc;
}, {});
console.table(resultAry2);
