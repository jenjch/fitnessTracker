const router = require("express").Router();
const Workout = require("../models/workout.js");

// api routes

// POST /api/workouts
// > create an empty workout (with default date)

router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// PUT /api/workouts/:id
// > add an exercise to the workout with a matching id
//   - req.params.id

router.put("/api/workouts/:id", (req, res) => {

    // need to double check the exercises array after finalizing model
    // Workout.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.id)},
    // { $push: { exercises: req.body } }
    // , { new: true })
    // .then(dbWorkout => {
    //   res.json(dbWorkout);
    // })
    // .catch(err => {
    //   res.json(err);
    // });
});

// GET /api/workouts
// > display (json) all workouts
router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET /api/workouts/range
// > display (json) last 7 workouts (or all workouts this week)

router.get("/api/workouts/range", (req, res) => {
  
//   Workout.find({})
//     .sort({ day: -1 })
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
  
});

// DELETE /api/workouts
// > delete workout with matching id
//   - body.id

router.delete("/api/workouts", (req, res) => {
  Workout.deleteOne({ _id: mongoose.Types.ObjectId(req.body.id) })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
