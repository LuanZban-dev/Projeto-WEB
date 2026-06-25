import { Router } from "express";
import { DraftController } from "../controllers/draft.controller";
import { asyncHandler } from "../utils/async-handler";

// Define as rotas relacionadas ao draft de jogadores
export const draftRoutes = Router();
const draftController = new DraftController();

draftRoutes.get("/players/search", asyncHandler(draftController.searchPlayers));
// Cria um novo jogador no draft
draftRoutes.post("/draft", asyncHandler(draftController.create));
// Retorna todos os jogadores do draft
draftRoutes.get("/draft", asyncHandler(draftController.index));
// Retorna um jogador específico pelo ID
draftRoutes.get("/draft/:id", asyncHandler(draftController.show));
// Atualiza um jogador do draft
draftRoutes.put("/draft/:id", asyncHandler(draftController.update));
// Remove um jogador do draft
draftRoutes.delete("/draft/:id", asyncHandler(draftController.delete));
