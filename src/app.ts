import cors from "cors";
import "dotenv/config";
import express from "express";
import { errorHandler } from "./middlewares/error-handler";
import { draftRoutes } from "./routes/draft.routes";

// Cria a aplicação Express principal
export const app = express();

// Middlewares globais: CORS e parser JSON para requests
app.use(cors());
app.use(express.json());

// Rota raiz apenas para confirmar que a API está funcionando
app.get("/", (_request, response) => {
  response.json({
    message: "Football draft API",
    routes: {
      search: "GET /players/search?name=Messi",
      create: "POST /draft",
      list: "GET /draft"
    }
  });
});

// Rotas do draft e middleware de tratamento de erros
app.use(draftRoutes);
app.use(errorHandler);
