const express = require("express");
const router = express.Router();

// '/board' get/post/put/delete
router
  .route("/")
  .get((req, res) => {
    res.send("Board GET");
  })
  .post((req, res) => {
    res.send("Board POST");
  })
  .put((req, res) => {
    res.send("Board PUT");
  })
  .delete((req, res) => {
    res.send("Board DELETE");
  });

module.exports = router;
