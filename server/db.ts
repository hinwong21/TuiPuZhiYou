import Knex from "knex";
const knexConfig = require("./knexfile");

export let knex = Knex(knexConfig["development"]);
