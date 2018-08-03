var express = require("express");
var path = require("path");
var app = express();

app.set("port", 3000);
app.use(express.static(path.join(__dirname, "dist")));

// Listen for requests
var server = app.listen(app.get("port"), function() {
  var port = server.address().port;
  console.log("Demo running in http://localhost:" + port);
});
