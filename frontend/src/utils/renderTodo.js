export function renderTaskRow(todo) {
  const todoElement = document.createElement("div");
  const todoTitle = document.createElement("h1");
  const todoCheckbox = document.createElement("input");
  const todoActions = document.createElement("div");

  todoCheckbox.type = "checkbox";
  todoTitle.textContent = todo.title;

  const btnDelete = document.createElement("button");
  btnDelete.classList.add(
    "bg-pink-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-red-600"
  );
  btnDelete.textContent = "Delete";

  const btnEdit = document.createElement("button");
  btnEdit.classList.add(
    "bg-white",
    "text-red-400",
    "border-red-400",
    "p-2",
    "rounded",
    "ml-2",
    "mr-2",
    "hover:bg-pink-800",
    "font-bold"
  );
  btnEdit.textContent = "Edit";

  btnEdit.addEventListener("click", () => {
    const newTitle = prompt("Enter the new title");
    if (newTitle) {
      fetch(`http://localhost:4000/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title: newTitle }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.todo) {
            td2.textContent = data.todo.title;
          }
        });
    }
  });

  btnDelete.addEventListener("click", () => {
    const userConfirmed = confirm(
      "Are you sure you want to delete this todo item?"
    );
    if (userConfirmed) {
      fetch(`http://localhost:4000/todos/${todo.id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === "Todo deleted") {
            tbody.removeChild(tr);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });

  todoActions.appendChild(btnEdit);
  todoActions.appendChild(btnDelete);
  todoElement.appendChild(todoTitle);
  todoElement.appendChild(todoCheckbox);
  todoElement.appendChild(todoActions);

  return todoElement;
}
