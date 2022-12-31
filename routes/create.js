const express = require("express");
const { createUser } = require("../mysql/queries");
const router = express.Router();
const sha256 = require("sha256");
const sendEmail = require("../email/sib");

router.post("/", async (req, res) => {
  let { first_name, surname, email, password } = req.body;

  //check we have all the data
  if (first_name && surname && email && password) {
    password = sha256(process.env.SALT + password);

    const result = await req.asyncMySQL(
      createUser(first_name, surname, email, password)
    );

    if (result.affectedRows === 1) {
      //send a welcome email
      sendEmail(
        email,
        "Welcome to GCSE Computer Science",
        `Hi ${first_name}, thank you for creating an account, we hope this site helps you to revise and succeed.`
      );
      res.send({ status: 1 });
    } else {
      res.send({ status: 0, error: "Duplicate entry" });
    }

    return;
  }

  res.send({ status: 0, error: "Some data missing" });
});

module.exports = router;
