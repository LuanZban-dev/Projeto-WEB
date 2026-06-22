import { Request, Response } from "express";
import { DraftService } from "../services/draft.service";

const draftService = new DraftService();

export class DraftController {
  async searchPlayers(request: Request, response: Response) {
    const { name } = request.query;

    if (!name || typeof name !== "string") {
      return response.status(400).json({ message: "Informe o nome do jogador." });
    }

    const players = await draftService.searchPlayersByName(name);
    return response.json(players);
  }

  async create(request: Request, response: Response) {
    const player = await draftService.createDraftPlayer(request.body);
    return response.status(201).json(player);
  }

  async index(_request: Request, response: Response) {
    const players = await draftService.listDraftPlayers();
    return response.json(players);
  }

  async show(request: Request, response: Response) {
    const player = await draftService.getDraftPlayer(request.params.id);
    return response.json(player);
  }

  async update(request: Request, response: Response) {
    const player = await draftService.updateDraftPlayer(request.params.id, request.body);
    return response.json(player);
  }

  async delete(request: Request, response: Response) {
    await draftService.deleteDraftPlayer(request.params.id);
    return response.status(204).send();
  }
}
