/**
 * Mock the behavior of the `ui-react-app-server` project for playground development on localhost
 */
const express = require("express");
const path = require("path");
const fs = require("fs-extra");
const app = express();

app.get("/playground/loader", (req, res) => {
  const file = fs.readFileSync(
    path.join(__dirname + "/static/playground/loader/loader.html")
  );
  res.write(file);
  res.end();
});

app.get("/playground", (req, res) => {
  const file = fs.readFileSync(
    path.join(__dirname + "/static/playground/playground.html")
  );
  res.write(file);
  res.end();
});

app.use("/static", express.static(path.join(__dirname, "static")));

app.listen(3000, () => console.log("Listening on localhost:3000"));
