export function renderTaskRow(todo) {
  const tbody = document.querySelector("tbody");

  const tr = document.createElement("tr");

  const td1 = document.createElement("td");
  td1.classList.add("border", "px-4", "py-2");
  td1.textContent = todo.id;

  const td2 = document.createElement("td");
  td2.classList.add("border", "px-4", "py-2");
  td2.textContent = todo.title;

  const td3 = document.createElement("td");
  td3.classList.add("border", "px-4", "py-2");
  td3.textContent = todo.completed ? "Sí­" : "No";

  const td4 = document.createElement("td");
  td4.classList.add("border", "px-4", "py-2");
  td4.textContent = todo.owner;

  const td5 = document.createElement("td");
  td5.classList.add("border", "px-4", "py-2");

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

  td5.appendChild(btnEdit);
  td5.appendChild(btnDelete);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tbody.appendChild(tr);
}
