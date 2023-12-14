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
        return res.json({ success: true});
      } else {
        return res.json({ success: false });
      }
    } catch (err) {
      errorHandler(err, req, res);
    }
  };
}
