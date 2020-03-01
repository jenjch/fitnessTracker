const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
    // unique: true,
  },
  //   exercise in same schema
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        enum: ["cardio", "resistance"],
        required: "select exercise type"
      },
      name: {
        type: String,
        trim: true,
        required: "enter exercise name"
      },
      duration: {
        type: Number,
        required: "enter exercise duration"
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

// In Mongoose, a virtual is a property that is not stored in MongoDB. Virtuals are typically used for computed properties on documents.
WorkoutSchema.virtual('totalDuration').get(function() {
    // this.duration for loop adding up all the exercise durations in a given workout
    let totalDuration = 0;
    for (let i=0; i<this.exercises.length; i++) {
        // this.exercises[i]
        totalDuration += this.exercises[i].duration;
        console.log(totalDuration);
      } 
    return totalDuration;
  });

//  need this to make sure to send virtuals along with JSON
WorkoutSchema.set("toJSON", {virtuals:true});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
