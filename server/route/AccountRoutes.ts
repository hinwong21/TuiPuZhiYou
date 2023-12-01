import express from "express";
import { knex } from "../db";
import { AccountService } from "../service/AccountService";
import { AccountController } from "../controller/AccountController";

export let accountRoutes = express.Router();

export let accountService = new AccountService(knex);
let accountController = new AccountController(accountService);

accountRoutes.post("/register", accountController.registerNewAccount)