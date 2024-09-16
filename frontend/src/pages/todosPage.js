import { renderTaskRow } from "../utils/renderTodo";
export const todosPage = () => {
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "h-screen",
    "bg-pink-200"
  );

  const container2 = document.createElement("div");

  container2.classList.add("flex", "justify-center", "w-full", "gap-4");

  const btnHome = document.createElement("button");

  btnHome.classList.add(
    "bg-white",
    "text-black",
    "p-2",
    "rounded",
    "hover:bg-pink-400",
    "mb-4",
    "font-bold"
  );

  btnHome.textContent = "Home";

  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const title = document.createElement("h1");

  title.classList.add("text-3xl", "font-bold", "mb-4");
  title.textContent = "List of Todos";

  const table = document.createElement("table");

  table.classList.add(
    "w-1/2",
    "bg-white",
    "shadow-md",
    "h-[700px]",
    "overflow-y-scroll"
  );

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  const th2 = document.createElement("th");
  th2.classList.add("border", "px-4", "py-2");
  th2.textContent = "Title";

  const th3 = document.createElement("th");
  th3.classList.add("border", "px-4", "py-2");
  th3.textContent = "Completed";

  const th5 = document.createElement("th");
  th5.classList.add("border", "px-4", "py-2");
  th5.textContent = "Actions";

  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th5);

  thead.appendChild(tr);

  const tbody = document.createElement("tbody");

  tbody.classList.add("text-center");
  table.appendChild(thead);
  table.appendChild(tbody);

  container.appendChild(btnHome);
  fetch("http://localhost:4000/todos", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      data.todos.forEach((todo) => {
        renderTaskRow(todo);
      });
    });

  const form = document.createElement("form");
  form.classList.add("flex", "flex-col", "items-center");

  const input = document.createElement("input");
  input.classList.add("p-2", "border", "mb-2", "w-[300px]");
  input.placeholder = "new Todo";

  const button = document.createElement("button");
  button.classList.add(
    "bg-pink-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-pink-800"
  );
  button.textContent = "Crear";
  button.type = "submit";

  button.addEventListener("click", (event) => {
    event.preventDefault();
    const title = input.value;
    if (title) {
      fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.todo) {
            renderTaskRow(data.todo);
            input.value = "";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });

  form.appendChild(input);
  form.appendChild(button);

  container2.appendChild(table);
  container2.appendChild(form);
  container.appendChild(title);
  container.appendChild(container2);

  return container;
};
