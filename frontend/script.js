// URL base da API backend usada pelo front-end
const API_URL = "http://localhost:3333";

const token = localStorage.getItem("token");

function authHeaders() {

    return {

        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`

    };

}

if (!token) {

    window.location.href = "login.html";

}

// Elementos do DOM usados pela aplicação
const searchForm = document.querySelector("#search-form");
const searchNameInput = document.querySelector("#search-name");
const searchResults = document.querySelector("#search-results");
const draftList = document.querySelector("#draft-list");
const refreshDraftButton = document.querySelector("#refresh-draft");
const message = document.querySelector("#message");
const formationSelect = document.querySelector("#formation-select");
const clearDraftButton = document.querySelector("#clear-draft");

let selectedPlayer = null;

let lineup = {};

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
              <button type="button" data-select-index="${index}">Selecionar</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  // Adiciona o evento de clique para cada botão de selecionar ao draft
  document.querySelectorAll("[data-select-index]").forEach((button) => {
    button.addEventListener("click", () => selectPlayer(players[Number(button.dataset.selectIndex)]));
  });
}

function selectPlayer(player){

    selectedPlayer = player;

    showMessage(
        `${player.name} selecionado. Agora clique em uma posição do campo.`
    );

}

const formations = {

    "4-3-3":[

        {label:"LW", row:1,col:1},
        {label:"ST", row:1,col:3},
        {label:"RW", row:1,col:5},

        {label:"CM", row:3,col:2},
        {label:"CM", row:3,col:3},
        {label:"CM", row:3,col:4},

        {label:"LB", row:5,col:1},
        {label:"CB", row:5,col:2},
        {label:"CB", row:5,col:4},
        {label:"RB", row:5,col:5},

        {label:"GK", row:7,col:3}

    ],

    "4-4-2":[

        {label:"ST", row:1,col:2},
        {label:"ST", row:1,col:4},

        {label:"LM", row:3,col:1},
        {label:"CM", row:3,col:2},
        {label:"CM", row:3,col:4},
        {label:"RM", row:3,col:5},

        {label:"LB", row:5,col:1},
        {label:"CB", row:5,col:2},
        {label:"CB", row:5,col:4},
        {label:"RB", row:5,col:5},

        {label:"GK", row:7,col:3}

    ],

    "4-2-3-1":[

        {label:"ST", row:1,col:3},

        {label:"LW", row:2,col:1},
        {label:"CAM", row:2,col:3},
        {label:"RW", row:2,col:5},

        {label:"CDM", row:4,col:2},
        {label:"CDM", row:4,col:4},

        {label:"LB", row:5,col:1},
        {label:"CB", row:5,col:2},
        {label:"CB", row:5,col:4},
        {label:"RB", row:5,col:5},

        {label:"GK", row:7,col:3}

    ],

    "4-2-2-2":[

      {label:"ST", row:1,col:2},
      {label:"ST", row:1,col:4},

      {label:"CAM", row:3,col:2},
      {label:"CAM", row:3,col:4},

      {label:"CDM", row:5,col:2},
      {label:"CDM", row:5,col:4},

      {label:"LB", row:6,col:1},
      {label:"CB", row:6,col:2},
      {label:"CB", row:6,col:4},
      {label:"RB", row:6,col:5},

      {label:"GK", row:7,col:3}

    ],

    "3-4-3":[

      {label:"LW", row:1,col:1},
      {label:"ST", row:1,col:3},
      {label:"RW", row:1,col:5},

      {label:"LM", row:3,col:1},
      {label:"CM", row:3,col:2},
      {label:"CM", row:3,col:4},
      {label:"RM", row:3,col:5},

      {label:"CB", row:5,col:1},
      {label:"CB", row:5,col:3},
      {label:"CB", row:5,col:5},

      {label:"GK", row:7,col:3}

    ]


};

// Renderiza a lista de jogadores do draft no campo de futebol
function renderDraft(){

    draftList.className = "football-pitch";
    draftList.innerHTML = "";

    const formation = formations[formationSelect.value];

    formation.forEach((position,index)=>{

        const slotId = `${position.label}-${index}`;

        const player = lineup[slotId] || null;

        const div=document.createElement("div");

        div.className="position-card";

        div.style.gridRow=position.row;
        div.style.gridColumn=position.col;

        if(player){

            div.innerHTML=`
                <div class="mini-card">
                    ${playerImage(player)}
                    <strong>${player.name}</strong>
                    <small>${position.label}</small>
                </div>
            `;

        }else{

            div.innerHTML=`
                <div class="mini-card empty-slot">
                    <strong>${position.label}</strong>
                </div>
            `;

        }

        div.addEventListener("click", async ()=>{

            if(!selectedPlayer)
                return;

                Object.keys(lineup).forEach((key) => {

                  if (
                      lineup[key] &&
                      lineup[key].externalId === selectedPlayer.externalId
                    ) {
                      lineup[key] = null;
                    }

                });


            await savePlayerToDraft(selectedPlayer, slotId);

            selectedPlayer = null;

            clearMessage();

        });

        draftList.appendChild(div);

    });

}

clearDraftButton.addEventListener("click", clearDraft);

formationSelect.addEventListener("change", changeFormation);

// Busca jogadores pelo nome usando a API
async function searchPlayers(event) {
  event.preventDefault();
  clearMessage();

  const name = searchNameInput.value.trim();
  if (!name) return;

  const response = await fetch(
    `${API_URL}/players/search?name=${encodeURIComponent(name)}`,
    {
        headers: authHeaders()
    }
);
  const players = await response.json();

  console.log(players); 

  renderSearchResults(players);
}

async function savePlayerToDraft(player, slotId) {

    clearMessage();

    const response = await fetch(`${API_URL}/draft`, {

        method: "POST",

        headers: authHeaders(),

        body: JSON.stringify({

            externalId: player.externalId,

            name: player.name,

            team: player.team,

            nationality: player.nationality,

            position: player.position,

            birthDate: player.birthDate,

            imageUrl: player.imageUrl,

            slot: slotId,

            formation: formationSelect.value

        })

    });

    if (!response.ok) {

        const error = await response.json();

        showMessage(error.message || "Erro ao salvar jogador.");

        return;

    }

    await loadDraft();

}


// Carrega o estado atual do draft do backend
async function loadDraft() {

    const response = await fetch(`${API_URL}/draft`, {
        headers: authHeaders()
    });

    const players = await response.json();

    lineup = {};

    players.forEach(player => {
        lineup[player.slot] = player;
    });

    renderDraft();

}

async function clearDraft() {

    if (!confirm("Deseja realmente limpar toda a escalação?")) {
        return;
    }

    const response = await fetch(`${API_URL}/draft`, {

        method: "DELETE",

        headers: authHeaders()

    });

    if (!response.ok) {

        showMessage("Erro ao limpar draft.");

        return;

    }

    lineup = {};

    selectedPlayer = null;

    clearMessage();

    await loadDraft();

}

async function changeFormation() {

    const response = await fetch(`${API_URL}/draft`, {

        method: "DELETE",

        headers: authHeaders()

    });

    if (!response.ok) {

        showMessage("Erro ao alterar formação.");

        return;

    }

    lineup = {};

    selectedPlayer = null;

    clearMessage();

    await loadDraft();

}

const logoutButton = document.querySelector("#logout-button");

logoutButton.addEventListener("click", logout);

function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";

}

// Eventos do formulário e botão de atualização
searchForm.addEventListener("submit", searchPlayers);


// Carrega o draft assim que a página for carregada
loadDraft().catch(() => showMessage("Inicie o backend com npm run dev antes de usar o front."));
