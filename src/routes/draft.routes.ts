import { Router } from "express";
import { DraftController } from "../controllers/draft.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const draftController = new DraftController();

export const draftRoutes = Router();

draftRoutes.get("/players/search", authMiddleware, draftController.searchPlayers);

draftRoutes.post("/draft", authMiddleware, draftController.create);

draftRoutes.get("/draft", authMiddleware, draftController.index);

draftRoutes.get("/draft/:id", authMiddleware, draftController.show);

draftRoutes.put("/draft/:id", authMiddleware, draftController.update);

draftRoutes.delete("/draft/:id", authMiddleware, draftController.delete);

draftRoutes.delete("/draft", authMiddleware, draftController.clear);