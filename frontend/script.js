// URL base da API backend usada pelo front-end
const API_URL = "http://localhost:3333";

// Elementos do DOM usados pela aplicação
const searchForm = document.querySelector("#search-form");
const searchNameInput = document.querySelector("#search-name");
const searchResults = document.querySelector("#search-results");
const draftList = document.querySelector("#draft-list");
const refreshDraftButton = document.querySelector("#refresh-draft");
const message = document.querySelector("#message");

// Exibe uma mensagem de status ou erro na interface
function showMessage(text) {
  message.textContent = text;
  message.hidden = false;
}

// Limpa a mensagem exibida previamente
function clearMessage() {
  message.hidden = true;
  message.textContent = "";
}

// Renderiza a foto do jogador ou uma inicial caso não exista imagem
function playerImage(player) {
  if (!player.imageUrl) {
    return `<span>${player.name.charAt(0).toUpperCase()}</span>`;
  }

  return `<img src="${player.imageUrl}" alt="${player.name}" />`;
}

// Monta a descrição do jogador com posição, time e nacionalidade
function playerMeta(player) {
  return [player.position, player.team, player.nationality].filter(Boolean).join(" | ") || "Sem detalhes";
}

// Renderiza os resultados da busca de jogadores
function renderSearchResults(players) {
  if (!players.length) {
    searchResults.className = "grid empty";
    searchResults.textContent = "Nenhum jogador encontrado.";
    return;
  }

  searchResults.className = "grid";
  searchResults.innerHTML = players
    .map(
      (player, index) => `
        <article class="player-card">
          <div class="avatar">${playerImage(player)}</div>
          <div>
            <h3>${player.name}</h3>
            <div class="meta">${playerMeta(player)}</div>
            <div class="actions">
              <button type="button" data-add-index="${index}">Adicionar ao draft</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  // Adiciona o evento de clique para cada botão de adicionar ao draft
  document.querySelectorAll("[data-add-index]").forEach((button) => {
    button.addEventListener("click", () => addToDraft(players[Number(button.dataset.addIndex)]));
  });
}

// Posições fixas para desenhar o time em formação 4-3-3
const formation433 = {
  GK:{top:"82%",left:"44%"},
  LB:{top:"65%",left:"8%"},
  CB1:{top:"65%",left:"30%"},
  CB2:{top:"65%",left:"58%"},
  RB:{top:"65%",left:"80%"},
  CM2:{top:"35%",left:"44%"},
  LW:{top:"15%",left:"10%"},
  ST:{top:"8%",left:"44%"},
  RW:{top:"15%",left:"78%"}
};

// Mapeia a posição do jogador para coordenadas visuais na formação
function getPosition(position){
  const pos = (position || "").toUpperCase();
  if (pos.includes("GOAL") || pos.includes("GK")) return formation433.GK;
  if (pos.includes("LEFT WING")) return formation433.LW;
  if (pos.includes("RIGHT WING")) return formation433.RW;
  if (pos.includes("STRIKER")) return formation433.ST;
  if (pos.includes("CB")) return formation433.CB1;
  return formation433.CM2;
}

// Renderiza a lista de jogadores do draft no campo de futebol
function renderDraft(players) {
  if (!players.length) {
    draftList.className = "football-pitch empty";
    draftList.textContent = "Nenhum jogador no draft ainda.";
    return;
  }

  draftList.className = "football-pitch";
  draftList.innerHTML = "";

  players.forEach((player) => {
    const pos = getPosition(player.position);
    const card = document.createElement("div");
    card.className = "position-card";
    card.style.top = pos.top;
    card.style.left = pos.left;
    card.innerHTML = `
      <div class="mini-card">
        <button class="remove-player" data-id="${player.id}" title="Remover jogador">✖</button>
        ${playerImage(player)}
        <strong>${player.name}</strong>
        <small>${player.position || "-"}</small>
      </div>`;

    draftList.appendChild(card);

    // Botão para remover o jogador do draft
    const removeBtn = card.querySelector(".remove-player");
    removeBtn.addEventListener("click", async () => {
      if (confirm(`Remover ${player.name} do draft?`)) {
        await deleteDraftPlayer(player.id);
      }
    });
  });
}

// Busca jogadores pelo nome usando a API
async function searchPlayers(event) {
  event.preventDefault();
  clearMessage();

  const name = searchNameInput.value.trim();
  if (!name) return;

  const response = await fetch(`${API_URL}/players/search?name=${encodeURIComponent(name)}`);
  const players = await response.json();
  renderSearchResults(players);
}

// Envia um jogador para o draft no backend
async function addToDraft(player) {
  clearMessage();

  const response = await fetch(`${API_URL}/draft`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(player)
  });

  if (!response.ok) {
    const error = await response.json();
    showMessage(error.message || "Nao foi possivel adicionar o jogador.");
    return;
  }

  await loadDraft();
}

// Carrega o estado atual do draft do backend
async function loadDraft() {
  clearMessage();

  const response = await fetch(`${API_URL}/draft`);
  const players = await response.json();
  renderDraft(players);
}

// Atualiza informações de um jogador do draft (status, rodada, nota)
async function updateDraftPlayer(event) {
  event.preventDefault();
  clearMessage();

  const form = event.currentTarget;
  const data = new FormData(form);

  const payload = {
    status: data.get("status"),
    draftRound: data.get("draftRound") ? Number(data.get("draftRound")) : null,
    draftPick: data.get("draftPick") ? Number(data.get("draftPick")) : null,
    notes: data.get("notes")
  };

  await fetch(`${API_URL}/draft/${form.dataset.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  await loadDraft();
}

// Remove um jogador do draft no backend
async function deleteDraftPlayer(id) {
  clearMessage();
  await fetch(`${API_URL}/draft/${id}`, { method: "DELETE" });
  await loadDraft();
}

// Eventos do formulário e botão de atualização
searchForm.addEventListener("submit", searchPlayers);
refreshDraftButton.addEventListener("click", loadDraft);

// Carrega o draft assim que a página for carregada
loadDraft().catch(() => showMessage("Inicie o backend com npm run dev antes de usar o front."));
