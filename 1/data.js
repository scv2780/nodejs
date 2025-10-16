// module기능.
const studentAry = [
  { sno: 100, sname: "홍길동", score: 80 },
  { sno: 200, sname: "김민수", score: 57 },
  { sno: 300, sname: "박철민", score: 77 },
  { sno: 400, sname: "오영수", score: 92 },
];

function sum(a, b) {
  return a + b;
}
const PI = 3.14;

function getStudentInfo() {
  return ["홍길동", "김민식", "박충원", "홍영기"];
}

let jsonString = `[{
    "id": 1,
    "first_name": "Ernestine",
    "last_name": "Stanner",
    "email": "estanner0@tmall.com",
    "gender": "Female",
    "salary": 9315
  },
  {
    "id": 2,
    "first_name": "Dewitt",
    "last_name": "Hulmes",
    "email": "dhulmes1@google.com",
    "gender": "Genderfluid",
    "salary": 9901
  },
  {
    "id": 3,
    "first_name": "Lois",
    "last_name": "Epp",
    "email": "lepp2@noaa.gov",
    "gender": "Polygender",
    "salary": 3890
  },
  {
    "id": 4,
    "first_name": "Jeremiah",
    "last_name": "Corse",
    "email": "jcorse3@nasa.gov",
    "gender": "Male",
    "salary": 7823
  },
  {
    "id": 5,
    "first_name": "Randell",
    "last_name": "Ellis",
    "email": "rellis4@hexun.com",
    "gender": "Male",
    "salary": 3623
  },
  {
    "id": 6,
    "first_name": "Osgood",
    "last_name": "Rapkins",
    "email": "orapkins5@lycos.com",
    "gender": "Male",
    "salary": 6719
  },
  {
    "id": 7,
    "first_name": "Marlena",
    "last_name": "Fildes",
    "email": "mfildes6@amazonaws.com",
    "gender": "Bigender",
    "salary": 8903
  },
  {
    "id": 8,
    "first_name": "Jeddy",
    "last_name": "Detheridge",
    "email": "jdetheridge7@mozilla.com",
    "gender": "Male",
    "salary": 5471
  },
  {
    "id": 9,
    "first_name": "Graig",
    "last_name": "Renols",
    "email": "grenols8@bravesites.com",
    "gender": "Male",
    "salary": 6949
  },
  {
    "id": 10,
    "first_name": "Siouxie",
    "last_name": "Millam",
    "email": "smillam9@reverbnation.com",
    "gender": "Female",
    "salary": 4642
  },
  {
    "id": 11,
    "first_name": "Emelda",
    "last_name": "Barszczewski",
    "email": "ebarszczewskia@twitter.com",
    "gender": "Female",
    "salary": 9309
  },
  {
    "id": 12,
    "first_name": "Shay",
    "last_name": "Sagerson",
    "email": "ssagersonb@reuters.com",
    "gender": "Female",
    "salary": 6661
  },
  {
    "id": 13,
    "first_name": "Talia",
    "last_name": "Zoren",
    "email": "tzorenc@odnoklassniki.ru",
    "gender": "Polygender",
    "salary": 8637
  },
  {
    "id": 14,
    "first_name": "Shandie",
    "last_name": "Dzenisenka",
    "email": "sdzenisenkad@bigcartel.com",
    "gender": "Female",
    "salary": 6541
  },
  {
    "id": 15,
    "first_name": "Ilyssa",
    "last_name": "Markey",
    "email": "imarkeye@slashdot.org",
    "gender": "Female",
    "salary": 9029
  }
]`;

export { studentAry, sum, PI, getStudentInfo, jsonString }; // export => 다른 파일에서 쓸 수 있도록 내보낸다
