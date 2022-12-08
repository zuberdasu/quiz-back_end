const express = require("express");
const { getQuestions } = require("../mysql/queries");
const router = express.Router();

router.get("/", async (req, res) => {
  //const results = await req.asyncMySQL(getQuestions());
  const output = [];
  //for (let i = 0; i < results.length; i++) {
  const topics = await req.asyncMySQL(`SELECT name, id
                                              FROM topics;`);

  //  results[i].answers = answers;
  // }
  for (let t = 0; t < topics.length; t++) {
    output.push({ [topics[t].name]: [] });
  }

  for (let i = 0; i < topics.length; i++) {
    const questions = await req.asyncMySQL(`SELECT id, question
                                            FROM questions
                                              WHERE topic_id = "${topics[i].id}";`);

    output[i][topics[i].name] = questions;
  }

  const arcArray = output[0].architecture;

  for (let b = 0; b < arcArray.length; b++) {
    const arcAnswers = await req.asyncMySQL(`SELECT answer, valid
                                              FROM answers
                                              WHERE question_id = "${arcArray[b].id}"`);
    arcArray[b].answers = arcAnswers;
    console.log("34", arcArray);

    // arcArray[b].[n].answers = [];
    let test = [];
    for (let p = 0; p < arcArray[b].answers.length; p++) {
      test = [];
      //topics[i].questions[n].answers.push(answers[p].answer);
      //console.log(arcArray[b].answers);
      if (
        arcArray[b].answers &&
        arcArray[b].answers[p] &&
        arcArray[b].answers[p].valid === 1
      ) {
        arcArray[b].correct = p;
      }

      //delete arcArray[b].answers[p].valid;

      //arcArray[b].answers = Object.values(arcArray[b].answers);

      // console.log("44", Object.values(arcArray[b].answers[p]));
      for (let d = 0; d < arcArray[b].answers.length; d++) {
        //console.log("50", arcArray[b].answers[d].answer);
        if (arcArray[b].answers[d] && arcArray[b].answers[d].answer) {
          test.push(arcArray[b].answers[d].answer);
        }
        // console.log("47", arcArray[b].answers[d]);
      }
      //console.log("54", answers);
    }
    if (test.length === 4) {
      arcArray[b].answers = test;
    }
  }

  if (topics.length === 0) {
    res.send({ status: 0, error: "Topic not found" });
    return;
  }
  res.send({ status: 1, result: arcArray });
});

module.exports = router;
