import axios from "axios";

export type SportsDbPlayer = {
  idPlayer: string;
  strPlayer: string;
  strTeam?: string;
  strNationality?: string;
  strPosition?: string;
  dateBorn?: string;
  strCutout?: string;
  strThumb?: string;
};

type SearchPlayersResponse = {
  player: SportsDbPlayer[] | null;
};

export class SportsDbService {
  async searchPlayersByName(name: string) {
    const response = await axios.get<SearchPlayersResponse>(
      `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(name)}`
    );

    return response.data.player ?? [];
  }
}
