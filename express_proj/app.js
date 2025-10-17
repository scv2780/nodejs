// app.js
// 사용하는 모듈.
const express = require("express");
const fs = require("fs");
const cookieSession = require("cookie-session");
const multer = require("multer");
// 업로드 폴더 없으면 자동 생성
fs.mkdirSync("uploads", { recursive: true });

// 라우터 모듈
const customerRouter = require("./routes/customers");
const productRouter = require("./routes/products");
const boardsRouter = require("./routes/boards");

// 서버인스턴스.
const app = express();

// body-parser 대신 express 내장함수 사용.
// header/body
// parding application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false })); //user-1234&name=hong
// parsing application/json
app.use(express.json());

// 정적디렉토리 설정.
app.use(express.static("public"));

// 쿠키세션 설정.
app.use(
  cookieSession({
    name: "session",
    keys: ["asdfasdfasfasasdf", "asdfasdfasdfasdfsafg"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// 파일업로드 설정.
const storage = multer.diskStorage({
  // 업로드될 폴더 설정
  destination: (req, file, cb) => cb(null, "uploads/"),
  // 업로드될 파일 이름 설정
  filename: (req, file, cb) => {
    const original = Buffer.from(file.originalname, "latin1").toString("utf8");
    cb(null, Date.now() + "-" + original);
  },
});

// multer 객체 생성.
const upload = multer({ storage: storage });

// 라우팅 정보가 많으면 파일로 나눠서 작성.
// customers.js, products.js
app.use("/customers", customerRouter); // '/', '/add'
app.use("/products", productRouter); // '/', '/add'
app.use("/boards", boardsRouter);

// 라우팅 정보: '/' -> 'page정보', '/list' -> '글목록정보'
// get/post/put/delete 요청정보 처리결과 출력.

app.get("/", (req, res) => {
  //req: 요청, res: 응답
  fs.readFile("./root.html", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
      return;
    }
    res.send(data);
  });
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("POST request ti the homepage");
});

// 파일업로드 테스트.
// app.post("/upload", upload.single("profile"), (req, res, next) => {
//   // 'profile'은 form에서 업로드하는 파일의 name속성값.
//   if (!req.file) return next(new Error("파일이 업로드되지 않았습니다."));
//   console.log(req.file); // 업로드된 파일 정보.
//   res.send("파일 업로드 완료!");
// });

// 숙제: 여러파일 업로드 처리. 하는중
app.post("/upload", upload.single("fileInput"), (req, res, next) => {
  if (!req.file) return next(new Error("파일이 업로드되지 않았습니다."));
  console.log(req.file); // 업로드된 파일 정보.
  res.send("파일 업로드 완료!");
});

// cookie-session 테스트.
// app.get("/login", (req, res) => {
//   if (!req.session.views) {
//     req.session.views = 1;
//   } else {
//     req.session.views++;
//   }

//   res.send(`현재 ${req.session.views}번째 방문입니다.
//     <br><a href="/logout">로그아웃</a>`);
// });

// app.get("/logout", (req, res) => {
//   req.session = null;
//   res.redirect("/login");
// });

app.post("/:user/:score", (req, res) => {
  // localhost:3000/hong/90
  console.log(req.params);
  res.send("POST request ti the homepage");
});

app.post("/test", (req, res) => {
  // console.table(req.body);
  let obj = {};
  obj.학번 = req.body.sno;
  obj.이름 = req.body.sname;
  obj.합격여부 = req.body.score;
  if (obj.합격여부 >= 60) {
    obj.합격여부 = `합격(${obj.합격여부})`;
  } else {
    obj.합격여부 = `불합격(${obj.합격여부})`;
  }
  let result = `
    ------------------------------
    | 학번 | ${obj.학번} |
    | 이름 | ${obj.이름} |
    | 합격여부 | ${obj.합격여부} |
    ------------------------------
  `;
  res.send(result);
});

// 문제
// 라우팅: /login
// id, pass 입력.
// 맞으면 "홍길동" 환영합니다.
// 틀리면 "아이디와 비밀번호를 확인하세요"
// 방법 1. html생성 테스트
// 방법 2. Postman 테스트
app.post("/login", (req, res) => {
  fs.readFile("./user_info.txt", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
      return;
    }
    const lines = data.split("\n").find((member) => {
      const [user, plass, name] = member.split(",");
      return [user, plass, name];
    });

    console.log(lines);
    res.send(lines);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
