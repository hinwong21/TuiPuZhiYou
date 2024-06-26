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
recordRoutes.post("/giftAmt", recordController.checkGiftAmt);
recordRoutes.post("/exchangeAmt", recordController.checkExchangeGiftAmt);
recordRoutes.post("/event", recordController.joinEventRecord);
recordRoutes.post("/exchangeGift", recordController.getAllExchangeGiftRecord);
recordRoutes.post("/joinedEvent", recordController.getAllJoinedEventRecords);
recordRoutes.post("/user", recordController.getAllProjectUserDetail);
//recordRoutes.post("/eventUpdate", recordController.updateEvent);
// recordRoutes.post("/checkParticipant", recordController.checkParticipant);
//recordRoutes.post("/giftUpdate", recordController.updateGiftAmt);

recordRoutes.post(
  "/admin/gift",
  recordController.getAllProjectExchangeGiftDetails
);
recordRoutes.post(
  "/admin/event",
  recordController.getAllProjectJoinedEventDetails
);
recordRoutes.post(
  "/admin/giftId",
  recordController.getGiftExchangeRecordByGiftId
);
recordRoutes.post("/admin/tookGift", recordController.setGiftIsExchanged);
recordRoutes.post("/event/upload", recordController.uploadJoinEventRecord);
recordRoutes.post("/gift/upload", recordController.uploadExchangeGiftRecord);
recordRoutes.post("/user/point", recordController.getAllPointRecords);
