import { Router } from "express";
import db from "../config/db.js";
import {
  checkUser,
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post("/create-user", createUser);

authRouter.post("/login", loginUser);

authRouter.post("/logout", logoutUser);

authRouter.get("/check-user", checkUser);

export default authRouter;
