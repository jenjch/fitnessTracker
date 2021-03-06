const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// additional code to prevent warnings regarding deprecation
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

//sample connection code, from example activities
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
//   useNewUrlParser: true
// });

// Written guide example for heroku deployment - if deployed, use the deployed databse. Otherwise use the local workout database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";

mongoose.connect(MONGODB_URI);

// HTML Routes

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

// API Routes

// POST /api/workouts
// create an empty workout (with default date)

app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// PUT /api/workouts/:id
// add an exercise to the workout with a matching id
// req.params.id

app.put("/api/workouts/:id", (req, res) => {
  // need to double check the exercises array after finalizing model
  db.Workout.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    { $push: { exercises: req.body } },
    { new: true }
  )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET /api/workouts
// display (json) all workouts
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET /api/workouts/range
// display (json) last 7 workouts (or all workouts this week)

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    // sort gets the most recent entries
    .sort({ day: -1 })
    // limit to the last 7 entries
    .limit(7)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// DELETE /api/workouts
// delete workout with matching id
// body.id
// but no delete button for front end

app.delete("/api/workouts", (req, res) => {
  db.Workout.deleteOne({ _id: mongoose.Types.ObjectId(req.body.id) })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
