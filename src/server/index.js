const AYLIENTextAPI = require("aylien_textapi");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const mockAPIResponse = require("./mockAPI.js");

dotenv.config();

const textapi = new AYLIENTextAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

const app = express();
app.use(cors());
app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

// BODY-PARSER
// https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
// https://stackoverflow.com/questions/44233791/fetch-can-you-pass-parameters-to-the-server

app.post("/sentiment", function (req, res) {
  console.log("::: Running express.post :::");
  console.log(req.body.text);

  textapi.sentiment({ text: req.body.text }, function (
    err,
    result,
    rateLimits
  ) {
    console.log("Error below:");
    console.log(err);
    console.log("Result below:");
    console.log(result);
    console.log("ERate Limits  below:");
    console.log(rateLimits);
    res.send(result);
  });
});
