var path = require("path");
var db = require("../models");

module.exports = function(app) {
    // Each of the routes handles the HTML page that the user gets sent to. 
  
    //home route 
    app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname + "/public/index.html"));
    });
  
    //exercise
    app.get("/exercise", function(req, res) {
        res.sendFile(path.join(__dirname + "/public/exercise.html"));
      });

    //stats
    app.get("/stats", function(req, res) {
        res.sendFile(path.join(__dirname + "/public/stats.html"));
      });

  };