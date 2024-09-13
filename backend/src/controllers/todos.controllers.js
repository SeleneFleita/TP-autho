import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  const user = req.user;
  const todos = database.todos.filter((todos) => todos.owner === user.id);
  res.json({ todos });
};

export const actualizarTodosCtrl = (req, res) => {};

export const editarTodosCtrl = (req, res) => {};

export const eliminarTodosCtrl = (req, res) => {};
