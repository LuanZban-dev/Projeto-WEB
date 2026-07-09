# ⚽ Football Draft

Sistema web para gerenciamento de um **Draft de Futebol**, desenvolvido para fins acadêmicos, permitindo pesquisar jogadores, montar um time ideal e gerenciar seleções de atletas.

---

# 📖 Sobre o Projeto

O **Football Draft** é uma aplicação Full Stack que simula um sistema de Draft semelhante ao utilizado em ligas esportivas. A plataforma permite que usuários pesquisem jogadores, adicionem atletas ao seu draft, organizem a escalação em campo e gerenciem suas escolhas.

O projeto foi desenvolvido utilizando **Node.js**, **Express**, **Prisma**, **SQLite** e **HTML/CSS/JavaScript**, aplicando conceitos de autenticação, API REST, CRUD e integração com uma API externa.

---

# 🚀 Funcionalidades

* 🔐 Cadastro e autenticação de usuários (JWT)
* 🔍 Pesquisa de jogadores através da API TheSportsDB
* ⚽ Adição de jogadores ao Draft
* 📋 Listagem de jogadores selecionados
* ✏️ Atualização das informações dos jogadores
* ❌ Remoção de jogadores do Draft
* 🏟️ Campo tático para organização da equipe
* 🔒 Rotas protegidas por autenticação
* 📱 Interface responsiva

---

# 🛠️ Tecnologias Utilizadas

## Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* SQLite
* JWT (JSON Web Token)

## Frontend

* HTML5
* CSS3
* JavaScript

## API Externa

* TheSportsDB

---

# 📂 Estrutura do Projeto

```text
Projeto-WEB/

├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── script.js
│   ├── login.js
│   ├── register.js
│   └── styles.css
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── controller/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── app.ts
│   └── server.ts
│
├── package.json
├── tsconfig.json
└── README.md
```

---

# ⚙️ Instalação

Clone o repositório:

```bash
git clone https://github.com/LuanZban-dev/Projeto-WEB.git
```

Entre na pasta do projeto:

```bash
cd Projeto-WEB
```

Instale as dependências:

```bash
npm install
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Crie o banco de dados:

```bash
npx prisma db push
```

---

# 🔧 Configuração

Crie um arquivo **.env** na raiz do projeto.

```env
DATABASE_URL="file:./app.db"
PORT=3333

JWT_SECRET="larissa linda"
```

---

# ▶️ Executando o Projeto

Inicie o servidor:

```bash
npm run dev
```

Após iniciar o backend, abra no navegador:

```text
frontend/login.html
```

---

# 🗄️ Prisma Studio

Para visualizar o banco de dados:

```bash
npx prisma studio
```

---

# 🌐 Rotas da API

## Buscar jogadores

```http
GET /players/search?name=Messi
```

---

## Criar jogador no Draft

```http
POST /draft
```

Exemplo:

```json
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

---

## Listar jogadores

```http
GET /draft
```

---

## Buscar jogador por ID

```http
GET /draft/:id
```

---

## Atualizar jogador

```http
PUT /draft/:id
```

Exemplo:

```json
{
  "status": "DRAFTED",
  "draftRound": 1,
  "draftPick": 2,
  "notes": "Selecionado"
}
```

---

## Remover jogador

```http
DELETE /draft/:id
```

---

# 🔐 Fluxo de Autenticação

1. O usuário realiza login.
2. O backend valida as credenciais.
3. Um **JWT** é gerado.
4. O token é armazenado pelo cliente.
5. As próximas requisições enviam o token no cabeçalho **Authorization**.
6. O backend valida o token antes de permitir o acesso às rotas protegidas.

---

# 🎯 Objetivo

O Football Draft foi desenvolvido para praticar conceitos de desenvolvimento Full Stack, consumo de APIs, autenticação com JWT, banco de dados utilizando Prisma e organização de aplicações em arquitetura cliente-servidor.

---

# 👨‍💻 Equipe de Desenvolvimento

* **Luan Bela Santos Caetano** — RA: 2024001105
* **João Pedro Silva de Oliveira** — RA: 2024005140
