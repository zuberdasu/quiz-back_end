//require("dotenv").config();
const asyncMySQL = require("./mysql/connection");
const checkDBStatus = require("./tests/sql");
const express = require("express"); //the import
const app = express(); //create an instance
const cors = require("cors");
app.use(cors());
//const { checkToken } = require("./middleware/auth");
//const { getUniqueId } = require("./utils");
//const { addToLog } = require("./middleware/logging");
//check the db status
checkDBStatus(asyncMySQL);
// app.get("/", (req, res) => {
//   res.send({
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//   });
// });

//middleware
app.use(express.static("public")); //handle static files
app.use(express.json()); //turns the body into an object

//utility middleware
app.use((req, res, next) => {
  req.asyncMySQL = asyncMySQL;
  next();
});

//logging middleware
//app.use(addToLog);

// //custom middleware
app.use((req, res, next) => {
  //req.simpsons = simpsons;
  next();
});

//route middleware
//app.use("/delete", require("./routes/delete"));
app.use("/read", require("./routes/read"));
app.use("/create", require("./routes/create"));
app.use("/login", require("./routes/login"));
app.use("/logoff", require("./routes/logoff"));
app.use("/addScore", require("./routes/addScore"));

const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
