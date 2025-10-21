// app.js

const express = require("express");
const fs = require("fs");
const mysql = require("./sql");
const xlsx = require("xlsx");
const multer = require("multer");
const { excel_to_db } = require("./index.js");
const { log } = require("console");
const cron = require("node-cron");
const nodemailer = require("nodemailer");

// 메일API
const transporter = nodemailer.createTransport({
  host: "smtp.daum.net",
  port: 465,
  secure: true,
  auth: {
    user: "tjdcksgur.1@daum.net",
    pass: "tryetgzdfnyestgk",
  },
});

// 업로드 폴더 없으면 자동 생성
fs.mkdirSync("uploads", {
  recursive: true,
});

const app = express();
const PORT = 3000;

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
const upload = multer({
  storage: storage,
});

// 정적디렉토리 설정.
app.use(express.static("public"));

// body-parser 대신 express 내장함수 사용.
app.use(express.urlencoded({ extended: false }));
app.use(
  express.json({
    limit: "50mb",
  })
);

// 라우팅 정보.
app.get("/", (req, res) => {
  res.send("Hello World");
});

// customers 테이블 조회 => 엑셀 => 이메일 전송 시 첨부파일.
// '/customersInfo' GET 요청 처리.
app.get("/customersInfo", async (req, res) => {
  try {
    await mysql.queryExecute(`select * from customers`).then((result) => {
      // console.log(result); // 엑셀파일 데이터.
      // 워크북 생성 -> sheet 추가 -> 파일저장
      const workbook = xlsx.utils.book_new();
      const firstSheet = xlsx.utils.json_to_sheet(result, {
        header: ["id", "name", "email", "phone", "address"],
      });
      xlsx.utils.book_append_sheet(workbook, firstSheet, "customers"); // workbook에 sheet추가
      xlsx.writeFile(workbook, "./files/customers.xlsx"); // 파일저장
    });
    mailSendFunc();
    res.status(200).send(`DB를 파일로 메일전송 완료.`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 고객정보 -> 이메일로 발송.
// cron/start get요청. 10분단위로 고객의 정보를 메일발송.
// id/name/email/phone/address
// DB 정보...
// cron/stop get요청. 종료.
const mailSend = cron.schedule(
  "*/5 * * * * *",
  async () => {
    let result = await mysql.queryExecute(`select * from customers`, []);

    const data = {
      from: "tjdcksgur.1@daum.net",
      to: "tjdcksgur1@kakao.com",
      subject: "고객정보",
      html: `<pre>${JSON.stringify(result, null, 2)}</pre>`,
    };

    transporter.sendMail(data, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  },
  { scheduled: false }
);
mailSend.stop();

app.get("/cron/start", async (req, res) => {
  try {
    mailSend.start();
    res.send(`고객정보 메일 전송완료`);
  } catch (err) {
    res.status(500).err(`전송실패`);
  }
});

app.get("/cron/stop", async (req, res) => {
  try {
    mailSend.stop();
    res.send(`메일 전송중지 성공`);
  } catch (err) {
    res.status(500).send(`메일 전송중지 실패`);
  }
});

// 이미지 텍스트로 업로드
app.post("/upload/:productId/:type/:fileName", (req, res) => {
  const dir = `uploads/${req.params.productId}/${req.params.type}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filePath = `${dir}/${req.params.fileName}`;
  const base64Data = req.body.imageBase64.slice(
    req.body.imageBase64.indexOf(";base64") + 8
  );
  fs.writeFile(`${filePath}`, base64Data, "base64", (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("파일 저장 중 오류가 발생했습니다.");
    }
    console.log("파일이 성공적으로 저장되었습니다.");
  });
  res.send("OK");
});

// 업로드한 파일 DB업로드
app.post("/upload/excels", upload.single("excelFile"), async (req, res) => {
  console.log(req.file.path);
  try {
    // 멀티파트 폼데이터 처리. => db 저장.
    if (!req.file) return "파일이 업로드되지 않았습니다.";
    // console.log(req.file); // 업로드된 파일 정보.
    let filePath = req.file.path;

    excel_to_db(filePath);

    res.send("파일 업로드 및 DB 반영 완료!");
  } catch (err) {
    console.error(`업로드 중 오류 발생`, err);
    res.send(err);
  }
});

app.listen(PORT, () => {
  console.log("Server start");
});
