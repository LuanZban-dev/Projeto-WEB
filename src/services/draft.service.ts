import { prisma } from "../database/prisma";
import { SportsDbPlayer, SportsDbService } from "./sportsdb.service";

type DraftStatus = "WATCHLIST" | "DRAFTED" | "PASSED";

type CreateDraftPlayerDTO = {
  externalId?: string;
  name?: string;
  team?: string;
  nationality?: string;
  position?: string;
  birthDate?: string;
  imageUrl?: string;
  status?: DraftStatus;
  draftRound?: number;
  draftPick?: number;
  notes?: string;
};

type UpdateDraftPlayerDTO = Partial<Omit<CreateDraftPlayerDTO, "externalId">>;

const sportsDbService = new SportsDbService();

export class DraftService {
  async searchPlayersByName(name: string) {
    const players = await sportsDbService.searchPlayersByName(name);
    return players.map(this.mapSportsDbPlayer);
  }

  async createDraftPlayer(data: CreateDraftPlayerDTO) {
    if (!data.name) {
      throw new Error("O nome do jogador e obrigatorio.");
    }

    return prisma.draftPlayer.create({
      data: {
        externalId: data.externalId,
        name: data.name,
        team: data.team,
        nationality: data.nationality,
        position: data.position,
        birthDate: data.birthDate,
        imageUrl: data.imageUrl,
        status: data.status,
        draftRound: data.draftRound,
        draftPick: data.draftPick,
        notes: data.notes
      }
    });
  }

  async listDraftPlayers() {
    return prisma.draftPlayer.findMany({
      orderBy: [{ draftRound: "asc" }, { draftPick: "asc" }, { createdAt: "desc" }]
    });
  }

  async getDraftPlayer(id: string) {
    const player = await prisma.draftPlayer.findUnique({ where: { id } });

    if (!player) {
      throw new Error("Jogador nao encontrado.");
    }

    return player;
  }

  async updateDraftPlayer(id: string, data: UpdateDraftPlayerDTO) {
    await this.getDraftPlayer(id);

    return prisma.draftPlayer.update({
      where: { id },
      data
    });
  }

  async deleteDraftPlayer(id: string) {
    await this.getDraftPlayer(id);
    await prisma.draftPlayer.delete({ where: { id } });
  }

  private mapSportsDbPlayer(player: SportsDbPlayer) {
    return {
      externalId: player.idPlayer,
      name: player.strPlayer,
      team: player.strTeam,
      nationality: player.strNationality,
      position: player.strPosition,
      birthDate: player.dateBorn,
      imageUrl: player.strCutout || player.strThumb
    };
  }
}
