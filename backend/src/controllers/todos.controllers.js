import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  const user = req.user;
  const todos = database.todos.filter((todos) => todos.owner === user.id);
  res.json({ todos });
};

export const crearTodosCtrl = (req, res) => {
  const user = req.user;
  const { title } = req.body;
  if (!user) {
    return res.status(401).json({ message: "No autorizado" });
  }
  if (!title) {
    return res.status(400).json({ message: "Completar todos los campos" });
  }
  const Todo = {
    id: database.todos.length + 1,
    title,
    completed: false,
    owner: user.id,
  };
  database.todos.push(Todo);
  res.json({ message: "Tarea creada", todo: Todo });
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
    res.json("Todo deleted");
  } catch (error) {
    console.log(error);
  }
};
