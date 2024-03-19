let taskInput = document.getElementById("task-input");
let dateInput = document.getElementById("date-input");
let addTask = document.querySelector("#add-task");
let ul = document.querySelector(".task-container ul");

// Add Task to Local Storage
addTask.addEventListener("click", (e) => {
  e.preventDefault();

  let task = taskInput.value.trim();
  let date = dateInput.value.trim();

  if (task === "") {
    alert("Please enter a task!");
    return;
  }

  let taskObj = {
    id: new Date().getTime(), // Unique ID for each task
    task: task,
    date: date,
  };

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskObj);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  displayTasks();

  taskInput.value = "";
  dateInput.value = "";
});

// Function to display tasks
function displayTasks() {
  ul.innerHTML = "";

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((taskObj) => {
    let li = document.createElement("li");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    let taskText = document.createTextNode(taskObj.task);
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(taskObj.id));
    let updateBtn = document.createElement("button");
    updateBtn.textContent = "Update";
    updateBtn.addEventListener("click", () => updateTask(taskObj.id));
    let timeText = document.createElement("span");
    timeText.classList.add("task-time");
    let taskTime = new Date(taskObj.id).toLocaleString();
    timeText.textContent = "Added: " + taskTime;
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(timeText);
    li.appendChild(deleteBtn);
    li.appendChild(updateBtn);
    ul.appendChild(li);
 });
}

// Function to delete task
function deleteTask(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((taskObj) => taskObj.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

// Function to update task
function updateTask(id) {
  let newTask = prompt("Enter updated task:");
  if (newTask !== null) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskIndex = tasks.findIndex((taskObj) => taskObj.id === id);
    if (taskIndex !== -1) {
      tasks[taskIndex].task = newTask;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    }
  }
}

// Initial display of tasks when page loads
displayTasks();
