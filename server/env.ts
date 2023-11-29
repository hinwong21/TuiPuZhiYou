import { config } from "dotenv";

config();

export let env = {
  //默認是這個環境，但可以透過.env修改
  NODE_ENV: "development",
  DB_NAME: process.env.DB_NAME || "",
  DB_USER: process.env.DB_USER || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  PORT: process.env.PORT || "",
};
