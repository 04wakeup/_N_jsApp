const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input"); // intput area

const toDoList = document.querySelector(".js-toDoList"); // ul
const doneToDoList = document.querySelector(".js-doneDoList"); // ul

const TODOS_LS = "toDos";
const DONETODOS_LS = "doneToDos";
let toDos = [];
let doneToDos = [];
let toDoKey = 0,
  doneDoKey = 0;

function doneToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const spanText = li.querySelector("span").innerText;
  deleteToDo(event); // delete first
  paintDoneToDo(spanText); // Dissplay first then Save
}
function backToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const spanText = li.querySelector("span").innerText;
  deleteDoneToDo(event); // delete first
  paintToDo(spanText); // Dissplay first then Save
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDocs = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDocs;
  saveToDos();
}
function deleteDoneToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  doneToDoList.removeChild(li);
  const cleanToDocs = doneToDos.filter(function (doneToDo) {
    return doneToDo.id !== parseInt(li.id);
  });
  doneToDos = cleanToDocs;
  saveDoneToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // void object.object
}
function saveDoneToDos() {
  localStorage.setItem(DONETODOS_LS, JSON.stringify(doneToDos)); // void object.object
}

function paintDoneToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");
  const span = document.createElement("span");
  doneDoKey = doneDoKey + 1;

  delBtn.innerText = "❌";
  backBtn.innerText = "⏪";
  delBtn.addEventListener("click", deleteDoneToDo);
  backBtn.addEventListener("click", backToDo);

  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  li.id = doneDoKey;
  doneToDoList.appendChild(li);

  const doneToDoObj = {
    id: doneDoKey,
    text: text,
  };

  doneToDos.push(doneToDoObj);
  saveDoneToDos();
}
function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const doneBtn = document.createElement("button");
  const span = document.createElement("span");
  toDoKey = toDoKey + 1;

  delBtn.innerText = "❌";
  doneBtn.innerText = "✅";
  delBtn.addEventListener("click", deleteToDo);
  doneBtn.addEventListener("click", doneToDo);

  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(doneBtn);
  li.id = toDoKey;
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: toDoKey,
  };

  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault(); // block extra default actions
  const currentValue = toDoInput.value;
  if (currentValue !== null && currentValue !== "") {
    paintToDo(currentValue);
    toDoInput.value = "";
  }
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); // string -> JSON
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
  // done to do list
  const loadedDoneToDos = localStorage.getItem(DONETODOS_LS);
  if (loadedDoneToDos !== null) {
    const parsedDoneToDos = JSON.parse(loadedDoneToDos);
    parsedDoneToDos.forEach(function (doneToDo) {
      paintDoneToDo(doneToDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
