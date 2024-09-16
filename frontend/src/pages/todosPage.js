import { renderTaskRow } from "../utils/renderTodo";
export const todosPage = () => {
  //Elements
  const container = document.createElement("div");
  const title = document.createElement("h1");
  const buttonHome = document.createElement("button");
  const todoContainer = document.createElement("div");

  //Atributes
  buttonHome.textContent = "Home";
  title.textContent = "Todos";

  //Classes
  container.classList.add(
    "bg-pink-300",
    "h-screen",
    "flex",
    "flex-col",
    "items-center",
    "gap-5"
  );
  buttonHome.classList.add("bg-pink-500", "text-white", "rounded", "p-2");
  title.classList.add("font-bold", "text-5xl", "mt-12");

  //Fecth todos

  fetch("http://localhost:4000/todos", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      data.todos.forEach((todo) => {
        const todoElement = renderTaskRow(todo);
        todoContainer.appendChild(todoElement);
      });
    });

  //Append
  container.appendChild(title);
  container.appendChild(buttonHome);
  container.appendChild(todoContainer);

  return container;
};
