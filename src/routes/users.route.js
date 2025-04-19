import { Router } from "express";
import {
  deleteUserById,
  findUserById,
  getAllUsers,
  loginUser,
  registerUser,
  updateUserbyId,
} from "../controllers/users.controller.js";
import {
  validate,
  validateLogin,
  validateUpdate,
} from "../middlewares/validate.middleware.js";
validate;
const routes = Router();

routes.get("/users", getAllUsers);
routes.get("/users/:id", findUserById);
routes.post("/register", validate, registerUser);
routes.delete("/users/:id", deleteUserById);
routes.put("/users/:id", validateUpdate, updateUserbyId);
routes.post("/login", validateLogin, loginUser);
export default routes;
