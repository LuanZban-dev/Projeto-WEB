import { Router } from "express";
import { DraftController } from "../controllers/draft.controller";
import { asyncHandler } from "../utils/async-handler";

export const draftRoutes = Router();
const draftController = new DraftController();

draftRoutes.get("/players/search", asyncHandler(draftController.searchPlayers));
draftRoutes.post("/draft", asyncHandler(draftController.create));
draftRoutes.get("/draft", asyncHandler(draftController.index));
draftRoutes.get("/draft/:id", asyncHandler(draftController.show));
draftRoutes.put("/draft/:id", asyncHandler(draftController.update));
draftRoutes.delete("/draft/:id", asyncHandler(draftController.delete));
