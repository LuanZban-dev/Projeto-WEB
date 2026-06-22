import cors from "cors";
import "dotenv/config";
import express from "express";
import { errorHandler } from "./middlewares/error-handler";
import { draftRoutes } from "./routes/draft.routes";

export const app = express();

app.use(cors());
app.use(express.json());

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

app.use(draftRoutes);
app.use(errorHandler);
