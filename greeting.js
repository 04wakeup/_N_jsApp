const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_ON = "showing";

function handelSubmit(event) {
  event.preventDefault(); // blck refresh, default actions followed
  const currentValue = input.value;
  paintGreeting(currentValue); // not saved yet , but can display
  saveName(currentValue); // now saved
}

function saveName(text) {
  localStorage.setItem("currentUser", currentValue);
}

function askForName() {
  form.classList.add(SHOWING_ON);
  form.addEventListener("submit", handelSubmit);
}

// display the name if it exists
function paintGreeting(text) {
  form.classList.remove(SHOWING_ON);
  greeting.classList.add(SHOWING_ON);
  greeting.innerText = `Hello ${text}`;
}

// Check whether name exists
function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  console.log(currentUser);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
