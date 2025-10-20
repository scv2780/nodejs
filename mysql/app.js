// app.js

const express = require("express");
const mysql = require("./sql/index");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// express app setup
const app = express();
const port = 3000;

const transporter = nodemailer.createTransport({
  host: "smtp.daum.net",
  port: 465,
  secure: true,
  auth: {
    user: "tjdcksgur.1@daum.net",
    pass: "tryetgzdfnyestgk",
  },
});

// middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello World!");
});

// 정적디렉토리 설정.
app.use(express.static("public"));

// 메일 보내기
// app.get("/sendmail", (req, res) => {
//   const data = {
//     from: "tjdcksgur.1@daum.net",
//     to: "jaeun-99@daum.net",
//     subject: "체인소맨",
//     html: "<p>결론: <b>체인소맨</b>은 안 본다.</p>",
//   };

//   transporter.sendMail(data, (err, info) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send({ errer: err.message });
//     } else {
//       console.log(info);
//       res.send("Email");
//     }
//   });
// });

// 비밀번호 재설정 이메일 발송 방법1
// app.get("/sendmail", async (req, res) => {
//   console.log(req.query);
//   let userid = req.query.userid;
//   let phone = req.query.phone;
//   let result = await mysql.queryExecute("select * from customers", []);
//   const user = result.find((item) => {
//     if (item.name == userid && item.phone == phone) {
//       return item;
//     }
//   });

//   const data = {
//     from: "tjdcksgur.1@daum.net",
//     to: user.email,
//     subject: "비밀번호 재설정",
//     html: "1234",
//   };

//   transporter.sendMail(data, (err, info) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send({ errer: err.message });
//     } else {
//       console.log(info);
//       res.send("비밀번호 재설정 메일 전송 완료");
//     }
//   });
// });

// 비밀번호 재설정 이메일 발송 방법2
app.get("/sendmail", async (req, res) => {
  console.log(req.query);
  let userid = req.query.userid;
  let phone = req.query.phone;
  let result = await mysql.queryExecute(
    "select email from customers where name = ? and phone = ?",
    [userid, phone]
  );
  console.log(result);
  const data = {
    from: "tjdcksgur.1@daum.net",
    to: result[0].email,
    subject: "비밀번호 재설정",
    html: "1234",
  };
  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).send({ errer: err.message });
    } else {
      console.log(info);
      res.send("비밀번호 재설정 메일 전송 완료");
    }
  });
});

// 회원가입
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  let userid = req.body.userid;
  let password = req.body.password;
  let email = req.body.email;
  let phone = req.body.phone;
  let salt = crypto.randomBytes(64).toString("base64");

  async function getCryptoPassword(password) {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, 100000, 64, "sha512", (err, key) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(key.toString("base64"));
      });
    });
  }

  let hashKey = await getCryptoPassword(password);

  let result = await mysql.queryExecute(
    `insert into customers
    set name = ?,
        email = ?,
        phone = ?,
        address = ?,
        password_hash = ?,
        password_salt = ?`,
    [userid, email, phone, "", hashKey, salt]
  );

  res.send(result);
});

// 로그인 만들기

// 함수 다른 폴더로 옮겨서 정리해보기

// nodemailer test route.

//customers table - select all
app.get("/customers", async (req, res) => {
  let result = await mysql.queryExecute("select * from customers", []);
  res.send(result);
});

app.get("/customers/:id", async (req, res) => {
  const id = req.params.id;
  let result = await mysql.queryExecute(
    "select * from customers where id = ?",
    [id]
  );
  res.send(result);
});

// insert
app.post("/customer", async (req, res) => {
  const param = req.body.param;
  // insert 쿼리 실행
  let result = await mysql.queryExecute(
    `insert into customers
    set ?`,
    param
  );
  res.send(result);
});

// delete
app.delete("/customer/:id", async (req, res) => {
  const id = req.params.id;
  let result = await mysql.queryExecute(
    `delete from customers
        where id = ?`,
    [id]
  );
  res.send(result);
});

// update
app.put("/customer", async (req, res) => {
  const param = req.body.param; // [{name:'test',email:'email'}, 6]
  console.log(param);
  let result = await mysql.queryExecute(
    `update customers
    set ?
    where id = ?`,
    param
  );
  res.send(result);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
