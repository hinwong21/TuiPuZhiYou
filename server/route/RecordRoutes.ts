import express from "express";
import { knex } from "../db";
import { RecordController } from "../controller/RecordController";
import { RecordService } from "../service/RecordService";

export let recordRoutes = express.Router();

export let recordService = new RecordService(knex);
let recordController = new RecordController(recordService);

recordRoutes.post("/point", recordController.addPointRecord);
recordRoutes.post("/waste", recordController.getWasteRecord);
