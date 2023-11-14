const scrollButtons = document.querySelectorAll(".scrollButton");

scrollButtons.forEach((scrollButton) => {
  scrollButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

const clock = document.querySelector("h2#clock");

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}
getClock();
setInterval(getClock, 1000);

const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.classList.add("list-button");
  button.addEventListener("click", deleteTodo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

document.getElementById("clear").addEventListener("click", function () {
  document.getElementById("memo").value = "";
  localStorage.removeItem("memo");
});


// 달력

function createCalendar(year, month) {
  const calendarContainer = document.getElementById("calendar-container");
  const currentDate = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0).getDate();

  let html = `<h2 class="Calendar-h2">${year}년 ${month}월</h2>`;
  html += "<table id='calendar'>";
  html +=
    "<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>";
  let day = 1;

  for (let i = 0; i < 6; i++) {
    html += "<tr>";

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < currentDate.getDay()) {
        html += "<td></td>";
      } else if (day > lastDay) {
        break;
      } else {
        const isToday = isSameDate(new Date(), new Date(year, month - 1, day));
        const className = isToday ? "today" : "";
        html += `<td class="${className}" onclick="selectDate(${day})">${day}</td>`;
        day++;
      }
    }

    html += "</tr>";
  }

  html += "</table>";
  calendarContainer.innerHTML = html;
}

function selectDate(day) {
  const selectedDate = document.querySelector(".selected");
  if (selectedDate) {
    selectedDate.classList.remove("selected");
  }

  const selectedDay = document.querySelector(
    `td:nth-child(${day + currentDate.getDay()})`
  );
  selectedDay.classList.add("selected");
}

function isSameDate(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

const currentDate = new Date();
createCalendar(currentDate.getFullYear(), currentDate.getMonth() + 1);




  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}${month}${day}_기술상담통계_`;
  }


  function displayFormattedDate() {
    const formattedDate = getCurrentDate();
    const name = "한현우";

    const result = `${formattedDate}_${name}`;


    const paragraphElement = document.getElementById("e-mail-title");
    if (paragraphElement) {
      paragraphElement.textContent = result;
    }
  }

  displayFormattedDate();
