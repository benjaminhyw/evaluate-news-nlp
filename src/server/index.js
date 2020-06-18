var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
var cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

var AYLIENTextAPI = require("aylien_textapi");

var textapi = new AYLIENTextAPI({
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

app.post("/testing", async function (req, res) {
  textapi.sentiment({ text: "John is a very good football player" }, function (
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
    res.send(mockAPIResponse);
  });
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});
