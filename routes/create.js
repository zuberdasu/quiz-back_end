const express = require("express");
const { createUser } = require("../mysql/queries");
const router = express.Router();
//const { getUniqueId } = require("../utils");
const sha256 = require("sha256");

router.post("/", async (req, res) => {
  console.log("create request received");
  console.log(req.body);
  let { name, email, password } = req.body;

  //check we have all the data
  if (name && email && password) {
    //password = sha256(process.env.SALT + password);
    //console.log(password);
    password = sha256(password);

    const result = await req.asyncMySQL(createUser(name, email, password));

    if (result.affectedRows === 1) {
      res.send({ status: 1 });
    } else {
      res.send({ status: 0, error: "Duplicate entry" });
    }

    return;
  }

  res.send({ status: 0, error: "Some data missing" });
});

module.exports = router;
