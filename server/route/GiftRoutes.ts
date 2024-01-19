import express from "express";
import { knex } from "../db";
import { GiftController } from "../controller/GiftController";
import { GiftService } from "../service/GiftService";

export let giftRoutes = express.Router();

export let giftService = new GiftService(knex);
let giftController = new GiftController(giftService);

giftRoutes.post("/add", giftController.addGift);
giftRoutes.post("/", giftController.getAllGifts);
giftRoutes.post("/delete", giftController.deleteGift);
