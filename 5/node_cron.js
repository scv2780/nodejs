// node_cron.js
const mysql = require("./sql");
const cron = require("node-cron"); // 주기적인 작업처리.
const winston = require("winston"); // 로그관리 모듈.

const logger = winston.createLogger({
  level: "info", // error>warn>info>http>verbose>debug>silly 선택한 것 이상의 모든것을 출력
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(
      (info) => `${info.timestamp} [${info.level}]: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "log/info.log" }),
  ],
});

async function customerList() {
  try {
    let result = await mysql.queryExecute(
      `select count(*) as cnt from customers`,
      []
    );
    logger.info(`customers 테이블의 현재건수: ${result[0].cnt}건`);
  } catch (err) {
    logger.error(`${err}`);
  }
}

// 매분마다 customers 데이터 변경된 건수를 출력.
// customers 테이블의 현재건수: 234건
cron.schedule("*/5 * * * * *", async () => {
  // let result = mysql.queryExecute(`select * from customers`, []);
  // console.log(`customers 테이블의 현재건수: ${result.length}건`, new Date());
  customerList();
});
