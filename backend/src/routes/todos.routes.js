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
todosRouter.post("/", crearTodosCtrl);
todosRouter.put("/:id", actualizarTodosCtrl);
todosRouter.delete("/:id", eliminarTodosCtrl);

export { todosRouter };
