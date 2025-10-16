// crypto.js

const crypto = require("crypto");
// const { resolve } = require("path");

let cryptPasswd = crypto.createHash("sha512").update("pw1234").digest("base64");
// console.log(cryptPasswd);

// 1. DB의 값을 암호화값 vs. 사용자 입력한 값 암호화값 => 비교후 판별.
let fixedSalt =
  "PzxlHn/h7K2DIDNNecKKS7gFp+6zwO+lBcrUMfopTFvciYRc7iyC1nPEq3xYQc9Nxs5/4bN3hYt5Jfwl5TVY8Q==";
async function getCryptoPassword(password) {
  // 1. salting 임의의 구문. => 동일한 평문(비밀번호) -> 다른 암호값.
  let salt = crypto.randomBytes(64).toString("base64");
  let dbPass =
    "9xYt3dqumo7tAZzztx5lMWfh7e5df9IerC+PZtOy1+PGQZ+lEeBWVCdtzDvltTd9Gcv1QV7rW58dN2KJTWvZmg==";
  console.log(salt);
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, fixedSalt, 100000, 64, "sha512", (err, key) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(key.toString("base64"));
      resolve(dbPass == key.toString("base64") ? "same" : "different");
    });
  });
}

getCryptoPassword("sample123")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
