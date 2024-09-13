import { Router } from "express";
import {
  actualizarTodosCtrl,
  editarTodosCtrl,
  eliminarTodosCtrl,
  getAllTodosCtrl,
} from "../controllers/todos.controllers.js";
import validarJwt from "../middlewares/validar-jwt.js";
const todosRouter = Router();

todosRouter.get("/", validarJwt, getAllTodosCtrl);
todosRouter.post("", actualizarTodosCtrl);
todosRouter.put("", editarTodosCtrl);
todosRouter.delete("", eliminarTodosCtrl);

export { todosRouter };
