
# Football Draft Backend

Sistema minimo de backend com CRUD para um draft de jogadores de futebol.

## Tecnologias

- Express
- Prisma
- SQLite
- TypeScript
- Axios

## Instalacao

```bash
npm i
npx prisma generate
npx prisma db push
```

Crie o arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="file:./app.db"
PORT=3333
```

## Rodar o projeto

```bash
npm run dev
```

Depois abra `frontend/index.html` no navegador para usar a interface.

## Prisma Studio

```bash
npx prisma studio
```

## Rotas

### Buscar jogadores na TheSportsDB

```http
GET /players/search?name=Messi
```

### Criar jogador no draft

```http
POST /draft
Content-Type: application/json

{
  "externalId": "34146370",
  "name": "Lionel Messi",
  "team": "Inter Miami",
  "nationality": "Argentina",
  "position": "Right Winger",
  "birthDate": "1987-06-24",
  "imageUrl": "https://...",
  "status": "WATCHLIST",
  "draftRound": 1,
  "draftPick": 1,
  "notes": "Prioridade do draft"
}
```

### Listar draft

```http
GET /draft
```

### Detalhar jogador

```http
GET /draft/:id
```

### Atualizar jogador

```http
PUT /draft/:id
Content-Type: application/json

{
  "status": "DRAFTED",
  "draftRound": 1,
  "draftPick": 2,
  "notes": "Selecionado"
}
```

### Remover jogador

```http
DELETE /draft/:id
```
=======
⚽ Football Draft

Sistema web para gerenciamento e seleção de jogadores de futebol em formato Draft, desenvolvido para fins acadêmicos e prática de desenvolvimento fullstack.




📖 Visão Geral

O Football Draft é uma plataforma que permite organizar processos de seleção de atletas, simulando o sistema de Draft utilizado em ligas esportivas. Os usuários podem visualizar jogadores disponíveis, realizar escolhas e acompanhar o histórico de seleções.

A aplicação foi construída utilizando tecnologias modernas para frontend e backend, garantindo uma experiência intuitiva e dinâmica.

🚀 Principais Recursos
👤 Cadastro e autenticação de usuários
⚽ Listagem de jogadores disponíveis
📊 Consulta de estatísticas dos atletas
🏆 Sistema de Draft para seleção de jogadores
🔄 Atualização e gerenciamento das escolhas
📋 Histórico completo de seleções realizadas
🔐 Controle de acesso e rotas protegidas
📱 Layout adaptável para dispositivos móveis
🛠️ Tecnologias Utilizadas
Frontend
React
Vite
JavaScript
CSS
Backend
Flask
Flask-CORS
API REST
JSON

🎯 Objetivo do Projeto

O objetivo deste sistema é facilitar a administração de processos de recrutamento e seleção de atletas, permitindo que usuários realizem escolhas estratégicas com base nas informações dos jogadores cadastrados.

👨‍💻 Equipe de Desenvolvimento
Luan Bela Santos Caetano (nº 2024001105)
João Pedro Silva de Oliveira (nº 2024005140)
>>>>>>> 48e360dbc1b40ed82cf11d24581ccf89973abf54
