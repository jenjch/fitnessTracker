// apis inside object (with different methods (functions inside an object))
// ES6 doesn't need to declare key and function name again
// value and key automatically api.getLastWorkout (function name is key)
const API = {
  // async before name means it will run once it recieves the necessary data/action (allows other lines of code to run)
  async getLastWorkout() {
    let res;
    // instead of .then
    try {
      // await forces javascript to wait for a response before running something else
      // fetch is built into JS (axios call)
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();

    // array (indexed at 0), showing last edited exercise/workout
    return json[json.length - 1];
  },

  async addExercise(data) {
    // location on browser
    // splits a string into an array, index 1 (what is after the equal sign), doesn't modify the data
    const id = location.search.split("=")[1];

    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      // making sure data is JSON format
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },
  async createWorkout(data = {}) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    return json;
  },

  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};
