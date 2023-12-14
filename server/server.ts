import express from "express";
import cors from "cors";
import { env } from "./env";
import { accountRoutes } from "./route/AccountRoutes";
import { eventRoutes } from "./route/EventRoutes";
import { recordRoutes } from "./route/RecordRoutes";

const app = express();
app.use(express.json({ limit: "50mb" }));

app.use(cors());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/account", accountRoutes);
app.use("/event", eventRoutes);
app.use("/record", recordRoutes);

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Start the server
app.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${env.PORT}/`);
});
