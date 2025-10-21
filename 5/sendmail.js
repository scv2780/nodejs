// sendmail.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.daum.net",
  port: 465,
  secure: true,
  auth: {
    user: "tjdcksgur.1@daum.net",
    pass: "tryetgzdfnyestgk",
  },
});

function mailSendFunc() {
  const data = {
    from: "tjdcksgur.1@daum.net",
    to: "jaeun-99@daum.net",
    subject: "subject",
    html: "Sample Content",
    attachments: [
      {
        filename: "customers.xlsx",
        path: "./files/customers.xlsx",
      },
    ],
  };

  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
} // end of mailsendFunc.
// mailSendFunc();

module.exports = { mailSendFunc };
