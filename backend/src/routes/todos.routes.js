import { Router } from "express";
import {
  actualizarTodosCtrl,
  crearTodosCtrl,
  eliminarTodosCtrl,
  getAllTodosCtrl,
} from "../controllers/todos.controllers.js";
import validarJwt from "../middlewares/validar-jwt.js";
const todosRouter = Router();

todosRouter.get("/", validarJwt, getAllTodosCtrl);
todosRouter.post("/", validarJwt, crearTodosCtrl);
todosRouter.put("/:id", validarJwt, actualizarTodosCtrl);
todosRouter.delete("/:id", validarJwt, eliminarTodosCtrl);

export { todosRouter };
