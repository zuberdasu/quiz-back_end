const express = require("express");
const { addScore } = require("../mysql/queries");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log("add score request received");
  console.log(req.body);
  let { token, score, topic } = req.body;

  //check we have all the data
  if (token && score && topic) {
    const result = await req.asyncMySQL(addScore(token, score, topic));

    if (result.affectedRows === 1) {
      res.send({ status: 1 });
    } else {
      res.send({ status: 0, error: "Error while adding score" });
    }

    return;
  }

  res.send({ status: 0, error: "Some data missing" });
});

module.exports = router;
