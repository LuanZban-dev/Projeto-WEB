import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

console.log("AuthRoutes carregadas");

export const authRoutes = Router();

const authController = new AuthController();

authRoutes.post("/auth/register", (req, res) =>
  authController.register(req, res)
);

authRoutes.post("/auth/login", (req, res) =>
  authController.login(req, res)
);