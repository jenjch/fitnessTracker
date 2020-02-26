const workoutTypeSelect = document.querySelector("#type");
const cardioForm = document.querySelector(".cardio-form");
const resistanceForm = document.querySelector(".resistance-form");
const cardioNameInput = document.querySelector("#cardio-name");
const nameInput = document.querySelector("#name");
const weightInput = document.querySelector("#weight");
const setsInput = document.querySelector("#sets");
const repsInput = document.querySelector("#reps");
const durationInput = document.querySelector("#duration");
const resistanceDurationInput = document.querySelector("#resistance-duration");
const distanceInput = document.querySelector("#distance");
const completeButton = document.querySelector("button.complete");
const addButton = document.querySelector("button.add-another");
const toast = document.querySelector("#toast");
const newWorkout = document.querySelector(".new-workout")

let workoutType = null;
let shouldNavigateAway = false;

// runs on init
async function initExercise() {
  let workout;

  // if no id, create new workout
  if (location.search.split("=")[1] === undefined) {
    workout = await API.createWorkout()
    console.log(workout)
  }
  // if there is workout (add id in url on browser)
  if (workout) {
    location.search = "?id=" + workout._id;
  }

}
// run upon load of exercise.js
initExercise();

// adds or removes classes 
function handleWorkoutTypeChange(event) {
  // sets the value for workoutType
  workoutType = event.target.value;

  if (workoutType === "cardio") {
    cardioForm.classList.remove("d-none");
    resistanceForm.classList.add("d-none");
  } else if (workoutType === "resistance") {
    resistanceForm.classList.remove("d-none");
    cardioForm.classList.add("d-none");
  } else {
    cardioForm.classList.add("d-none");
    resistanceForm.classList.add("d-none");
  }

  validateInputs();
}

// checking if inputs are empty
function validateInputs() {
  let isValid = true;

  if (workoutType === "resistance") {
    if (nameInput.value.trim() === "") {
      isValid = false;
    }

    if (weightInput.value.trim() === "") {
      isValid = false;
    }

    if (setsInput.value.trim() === "") {
      isValid = false;
    }

    if (repsInput.value.trim() === "") {
      isValid = false;
    }

    if (resistanceDurationInput.value.trim() === "") {
      isValid = false;
    }
  } else if (workoutType === "cardio") {
    if (cardioNameInput.value.trim() === "") {
      isValid = false;
    }

    if (durationInput.value.trim() === "") {
      isValid = false;
    }

    if (distanceInput.value.trim() === "") {
      isValid = false;
    }
  }

  // if valid, make sure buttons are enabled (not disabled, attribute built into buttons)
  if (isValid) {
    completeButton.removeAttribute("disabled");
    // if valid, allow user to add another exercise (button functional)
    addButton.removeAttribute("disabled");
  } else {
    completeButton.setAttribute("disabled", true);
    addButton.setAttribute("disabled", true);
  }
}

async function handleFormSubmit(event) {
  // prevents page from reload
  event.preventDefault();

  // placeholder for data
  let workoutData = {};

  // checking what the workout type is
  if (workoutType === "cardio") {
    workoutData.type = "cardio";
    // removes whitespace in string
    workoutData.name = cardioNameInput.value.trim();
    // converts to Number data type (from string)
    workoutData.distance = Number(distanceInput.value.trim());
    workoutData.duration = Number(durationInput.value.trim());
  } else if (workoutType === "resistance") {
    workoutData.type = "resistance";
    workoutData.name = nameInput.value.trim();
    workoutData.weight = Number(weightInput.value.trim());
    workoutData.sets = Number(setsInput.value.trim());
    workoutData.reps = Number(repsInput.value.trim());
    workoutData.duration = Number(resistanceDurationInput.value.trim());
  }

  // adding data to API call, passing object (data that user just input) to backend
  await API.addExercise(workoutData);
  clearInputs();
  // id of toast in html
  toast.classList.add("success");
}


function handleToastAnimationEnd() {
  // remove all classes (removing the attribute itself)
  toast.removeAttribute("class");
  // default is false for shouldNavigateAway
  // if true, redirect to homepage
  if (shouldNavigateAway) {
    location.href = "/";
  }
}

// clear page inputs after adding data
function clearInputs() {
  cardioNameInput.value = "";
  nameInput.value = "";
  setsInput.value = "";
  distanceInput.value = "";
  durationInput.value = "";
  repsInput.value = "";
  resistanceDurationInput.value = "";
  weightInput.value = "";
}


if (workoutTypeSelect) {
  // change is type of event
  workoutTypeSelect.addEventListener("change", handleWorkoutTypeChange);
}

if (completeButton) {
  completeButton.addEventListener("click", function (event) {
    shouldNavigateAway = true;
    // goes to "/" home page after completion
    handleFormSubmit(event);
  });
}
if (addButton) {
  addButton.addEventListener("click", handleFormSubmit);
}
// if toast pops up, ends so it doesn't keep looping
toast.addEventListener("animationend", handleToastAnimationEnd);

document
// for all input, run validateInputs
  .querySelectorAll("input")
  // shorthand for for loop (array method)
  .forEach(element => element.addEventListener("input", validateInputs));
