const toDoList = document.querySelector("#todo-list");
const url = "http://localhost:3000/todos";
let data;

function fetch_todos() {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("Got todos:", data);
      render_todos(data);
    });
}
function render_todos(data) {
  toDoList.innerHTML = "";
  data.forEach((task) => {
    const li = document.createElement("li");
    li.innerText = task.title;
    toDoList.appendChild(li);
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "delete";
    deleteBtn.setAttribute("class", task.id);
    li.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", () => {
      deleteTask(data, task);
    });
    styleByStatus(li, task);
  });
}

fetch_todos();

const addBtn = document.querySelector("form input[type='submit']");
addBtn.addEventListener("click", () => {
  console.log("i clicked");

  const newTask = {
    title: "Clean house",
    completed: false,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(newTask),
  };

  console.log(options);

  fetch(url, options)
    .then((response) => {
      return response.json();
    })
    .then((newTask) => {
      console.log("Got new task:", newTask);
    });
  console.log("Sending create request...");
  render_todos(data);
});

// DELETE
function deleteTask(data, task) {
  const uri = `http://localhost:3000/todos/${task.id}`;

  const options = {
    method: "DELETE",
  };
  fetch(uri, options)
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      fetch_todos();
    });
}
function styleByStatus(li, task) {
  if (task.completed === true) {
    li.setAttribute("class", "completed");
  }
}
