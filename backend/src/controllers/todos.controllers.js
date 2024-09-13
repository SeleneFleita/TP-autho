import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  const user = req.user;
  const todos = database.todos.filter((todos) => todos.owner === user.id);
  res.json({ todos });
};

export const crearTodosCtrl = (req, res) => {
  try {
    const { title, completed } = req.body;
    const id = database.length + 1;
    database.todos.push({ title, completed });
    res.send("Se ha agregado una nueva tarea.");
  } catch (error) {
    console.log(error);
  }
};

export const actualizarTodosCtrl = (req, res) => {
  try {
    const { title, completed } = req.body;
    const { id } = req.params;
    console.log({ id });
    const todo = database.todos.find((todo) => todo.id === Number(id));
    console.log(todo);

    todo.title = title;
    todo.completed = completed;

    res.send("se completo correctamente");
  } catch (error) {
    console.log(error);
  }
};

export const eliminarTodosCtrl = (req, res) => {
  try {
    const { id } = req.params;
    const task = database.todos.find((todos) => todos.id === Number(id));

    if (!task) {
      res.send("no se encontro la tarea");
    }

    const taskIndex = database.todos.findIndex(
      (todos) => todos.id === Number(id)
    );
    database.todos.splice(taskIndex, 1);
    res.send("La tarea fue eliminada.");
  } catch (error) {
    console.log(error);
  }
};
