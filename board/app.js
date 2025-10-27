// board 서버 프로그램 생성.
const express = require("express");
const cors = require("cors");
const mysql = require("./sql/index");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(cors());

// Root 페이지.
app.get("/", (req, res) => {
  res.send("Root 페이지");
});

// 목록.
app.get("/boards", async (req, res) => {
  let result = await mysql.queryExecute("select * from tbl_board", []);
  res.send(result);
});

// 추가.
app.post("/board", async (req, res) => {
  const param = req.body.param;
  let result = await mysql.queryExecute(
    `insert into tbl_board
    set ?`,
    param
  );
  res.send(result);
});

// 조회.
app.get("/board/:id", async (req, res) => {
  const id = req.params.id;
  let result = await mysql.queryExecute(
    "select * from tbl_board where id = ?",
    [id]
  );
  res.send(result);
});

// 수정.
app.put("/board", async (req, res) => {
  const param = req.body.param;
  let result = await mysql.queryExecute(
    `update tbl_board
      set ?
      where id = ?`,
    param
  );
  res.send(result);
});

// 삭제.
app.delete("/board/:id", async (req, res) => {
  const id = req.params.id;
  let result = await mysql.queryExecute(
    `delete from tbl_board
          where id = ?`,
    [id]
  );
  res.send(result);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
