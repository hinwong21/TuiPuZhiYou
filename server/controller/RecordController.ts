import express from "express";
import { errorHandler } from "../error";
import { RecordService } from "../service/RecordService";

export class RecordController {
  constructor(private recordService: RecordService) {}

  addPointRecord = async (req: express.Request, res: express.Response) => {
    const today = new Date();
    try {
      const userId = req.body.id;
      const point = req.body.point;
      const weight = req.body.weight;
      const projectId = "P001";
      const dateAdd = today;

      const result = await this.recordService.addPointRecord(
        userId,
        point,
        weight,
        projectId,
        dateAdd
      );
      if (result) {
        return res.json({ success: true });
      } else {
        return res.json({ success: false });
      }
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  getWasteRecord = async (req: express.Request, res: express.Response) => {
    try {
      const userId = req.body.id;
      const result = await this.recordService.getWasteRecord(userId);
      return res.json({ result: result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  exchangeGiftRecord = async (req: express.Request, res: express.Response) => {
    try {
      const today = new Date();
      const userId = req.body.userId;
      const giftId = req.body.giftId;
      const exchangePoint = req.body.exchangePoint;
      const projectId = "P001";
      const dateAdd = today;

      const result = await this.recordService.exchangeGiftRecord(
        userId,
        giftId,
        exchangePoint,
        projectId,
        dateAdd
      );
      return res.json({ success: true, result: result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  joinEventRecord = async (req: express.Request, res: express.Response) => {
    try {
      const userId = req.body.userId;
      const eventId = req.body.eventId;
      const projectId = "P001";
      const today = new Date();
      const dateAdd = today;
      await this.recordService.joinEventRecord(
        userId,
        eventId,
        projectId,
        dateAdd
      );
      return res.json({ success: true });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  getAllExchangeGiftRecord = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const userId = req.body.userId;
      const result = await this.recordService.getAllExchangeGiftRecord(userId);
      return res.json({ result: result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  getAllJoinedEventRecords = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const userId = req.body.userId;
      const result = await this.recordService.getAllJoinedEventRecords(userId);
      return res.json({ result: result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  getAllProjectUserDetail = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const project = req.body.project;
      const start = req.body.start;
      const end = req.body.end;
      const result = await this.recordService.getAllProjectUserDetail(
        project,
        start,
        end
      );
      return res.json({ result: result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  getAllProjectExchangeGiftRecord = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const project = req.body.project;
      const result = await this.recordService.getAllProjectExchangeGiftRecord(
        project
      );
      return res.json({ result: result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };
}
