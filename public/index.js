init();

async function init() {
  // everytime the app is run, get last workout
  if (location.search.split("=")[1] === undefined) {
    const workout = await API.getLastWorkout();
    
    if (workout) {
      // check for id of last workout
      location.search = "?id=" + workout._id;
    } else {
      // start from scratch? add class d-none
      document.querySelector("#continue-btn").classList.add("d-none")
    }
  }
}

