const express = require("express");
const { getQuestions } = require("../mysql/queries");
const router = express.Router();

router.get("/", async (req, res) => {
  const output = [];
  let topicArray = [];

  const topics = await req.asyncMySQL(`SELECT name, id
                                              FROM topics;`);

  for (let t = 0; t < topics.length; t++) {
    output.push({ [topics[t].name]: [] });
  }

  for (let i = 0; i < topics.length; i++) {
    const questions = await req.asyncMySQL(`SELECT id, question
                                           FROM questions
                                              WHERE topic_id = "${topics[i].id}";`);
    output[i][topics[i].name] = questions;
  }

  for (let t = 0; t < topics.length; t++) {
    topicArray = output[t][topics[t].name];

    for (let b = 0; b < topicArray.length; b++) {
      const questionAnswers = await req.asyncMySQL(`SELECT answer, valid
                                                FROM answers
                                                WHERE question_id = "${topicArray[b].id}"`);
      topicArray[b].answers = [];
      for (let c = 0; c < questionAnswers.length; c++) {
        topicArray[b].answers.push(questionAnswers[c].answer);

        if (questionAnswers[c].valid === 1) {
          topicArray[b].correct = c;
        }
      }
    }
  }

  res.send({ status: 1, result: output });
});

module.exports = router;
