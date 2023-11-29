import express from "express";
import cors from "cors";
import { env } from "./env";

const app = express();
app.use(express.json({ limit: "50mb" }));

app.use(cors());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Start the server
app.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${env.PORT}/`);
});
