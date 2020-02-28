const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
    // unique: true,
  },
  //   exercise
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        enum: ["cardio", "resistance"],
        required: "exercise type"
      },
      name: {
        type: String,
        trim: true,
        required: "exercise name"
      },
      duration: {
        type: Number,
        required: "exercise duration"
      },
      weight: {
        type: Number
      },
      reps: {
        type: Number
      },
      sets: {
        type: Number
      },
      distance: {
        type: Number
      }
    }
  ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
