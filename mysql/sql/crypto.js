// crypto.js
const crypto = require("crypto");

async function getCryptoPassword(password, salt) {
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

module.exports = { getCryptoPassword };
