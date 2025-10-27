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
  try {
    const rows = await mysql.queryExecute("SELECT * FROM tbl_board", []);
    // mysql.queryExecute가 rows만 반환하도록 가정. (배열이면 그대로 보내면 OK)
    res.json(rows);
  } catch (err) {
    console.error("GET /boards error:", err);
    res.status(500).json({ message: "Failed to fetch boards" });
  }
});

// 추가.
app.post("/board", async (req, res) => {
  try {
    const param = req.body.param; // {title, content, writer, ...}
    const result = await mysql.queryExecute(
      `INSERT INTO tbl_board SET ?`,
      param
    );
    // mysql2의 결과 형태를 { insertId: n }로 맞춰서 프론트가 쉽게 처리
    res.json({ id: result.insertId });
  } catch (err) {
    console.error("POST /board error:", err);
    res.status(500).json({ message: "Failed to add board" });
  }
});

// 조회
app.get("/board/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const rows = await mysql.queryExecute(
      "SELECT * FROM tbl_board WHERE id = ?",
      [id]
    );
    res.json(rows[0] ?? null);
  } catch (err) {
    console.error("GET /board/:id error:", err);
    res.status(500).json({ message: "Failed to fetch board" });
  }
});

// 수정.
app.put("/board/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const param = req.body.param; // {title, content, writer}
    const result = await mysql.queryExecute(
      `UPDATE tbl_board
       SET ?
       WHERE id = ?`,
      [param, id]
    );
    res.json({ affectedRows: result.affectedRows });
  } catch (err) {
    console.error("PUT /board/:id error:", err);
    res.status(500).json({ message: "Failed to modify board" });
  }
});

// 삭제.
app.delete("/board/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await mysql.queryExecute(
      `DELETE FROM tbl_board WHERE id = ?`,
      [id]
    );
    res.json({ affectedRows: result.affectedRows });
  } catch (err) {
    console.error("DELETE /board/:id error:", err);
    res.status(500).json({ message: "Failed to delete board" });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
