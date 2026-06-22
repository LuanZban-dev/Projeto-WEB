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
