const express = require("express");
const { getUserId, getTopicId, getScores } = require("../mysql/queries");
const router = express.Router();

router.post("/", async (req, res) => {
  let { token, topic } = req.body;

  if (token && topic) {
    const userIdResults = await req.asyncMySQL(getUserId(token));
    const topicIdResults = await req.asyncMySQL(getTopicId(topic));
    const maxScoreResults = await req.asyncMySQL(
      getScores(userIdResults[0].user_id, topicIdResults[0].id)
    );

    if (Object.values(maxScoreResults[0]) == 0) {
      res.send({ status: 0, error: "No scores found" });
    } else {
      res.send({ status: 1, score: Object.values(maxScoreResults[0]) });
    }
    return;
  } else {
    res.send({ status: 0, error: "Some data missing" });
  }
});

module.exports = router;
