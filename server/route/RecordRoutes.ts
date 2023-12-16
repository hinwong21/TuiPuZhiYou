import express from "express";
import { knex } from "../db";
import { RecordController } from "../controller/RecordController";
import { RecordService } from "../service/RecordService";

export let recordRoutes = express.Router();

export let recordService = new RecordService(knex);
let recordController = new RecordController(recordService);

recordRoutes.post("/point", recordController.addPointRecord);
recordRoutes.post("/waste", recordController.getWasteRecord);
recordRoutes.post("/gift", recordController.exchangeGiftRecord);
recordRoutes.post("/event", recordController.joinEventRecord);
recordRoutes.post("/exchangeGift", recordController.getAllExchangeGiftRecord);
recordRoutes.post("/joinedEvent", recordController.getAllJoinedEventRecords);
recordRoutes.post("/user", recordController.getAllProjectUserDetail);
recordRoutes.post("/admin/gift", recordController.getAllProjectExchangeGiftRecord);

