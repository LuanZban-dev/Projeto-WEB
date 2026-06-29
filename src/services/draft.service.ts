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
  slot?: string;
  formation?: string;
};

type UpdateDraftPlayerDTO = Partial<Omit<CreateDraftPlayerDTO, "externalId">>;

const sportsDbService = new SportsDbService();

export class DraftService {
  async searchPlayersByName(name: string) {
    const players = await sportsDbService.searchPlayersByName(name);
    return players.map(this.mapSportsDbPlayer);
  }

  async createDraftPlayer(userId: string, data: CreateDraftPlayerDTO) {

    if (!data.name) {
        throw new Error("O nome do jogador é obrigatório.");
    }

    const playerInSlot = await prisma.draftPlayer.findFirst({
        where: {
            userId,
            slot: data.slot
        }
    });

    if (
        playerInSlot &&
        playerInSlot.externalId !== data.externalId
    ) {
        await prisma.draftPlayer.delete({
            where: {
                id: playerInSlot.id
            }
        });
    }

    const existingPlayer = await prisma.draftPlayer.findFirst({
        where: {
            userId,
            externalId: data.externalId
        }
    });

    if (existingPlayer) {

        return prisma.draftPlayer.update({
            where: {
                id: existingPlayer.id
            },
            data: {
                slot: data.slot,
                formation: data.formation,
                team: data.team,
                nationality: data.nationality,
                position: data.position,
                birthDate: data.birthDate,
                imageUrl: data.imageUrl
            }
        });

    }

    return prisma.draftPlayer.create({

        data: {

            userId,
            externalId: data.externalId,
            name: data.name,
            team: data.team,
            nationality: data.nationality,
            position: data.position,
            birthDate: data.birthDate,
            imageUrl: data.imageUrl,
            slot: data.slot,
            formation: data.formation,
            status: data.status,
            draftRound: data.draftRound,
            draftPick: data.draftPick,
            notes: data.notes

        }

    });

}

  async listDraftPlayers(userId: string) {
    return prisma.draftPlayer.findMany({

      where: {
          userId
      },

      orderBy: [
          { draftRound: "asc" },
          { draftPick: "asc" },
          { createdAt: "desc" }
      ]

    });
  }

  async getDraftPlayer(
    userId: string,
    id: string
  ) {
    const player = await prisma.draftPlayer.findFirst({

      where: {
          id,
          userId
      }

    });

    if (!player) {
      throw new Error("Jogador nao encontrado.");
    }

    return player;
  }

  async updateDraftPlayer(
    userId: string,
    id: string,
    data: UpdateDraftPlayerDTO
  ) {
    await this.getDraftPlayer(userId, id);

    return prisma.draftPlayer.update({
      where: { id },
      data
    });
  }

  async deleteDraftPlayer(
    userId: string,
    id: string
  ) {
    await this.getDraftPlayer(userId, id);
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

  async clearDraft(userId: string) {

    await prisma.draftPlayer.deleteMany({

        where: {
            userId
        }

    });

  }

}

