import express from "express";
import { errorHandler } from "../error";
import { GiftService } from "../service/GiftService";

function getRandomSixDigitNumber() {
  const dateNow = new Date();
  const timestamp = dateNow.getTime().toString();
  const randomSixDigits = timestamp.substr(timestamp.length - 6).toString();
  return randomSixDigits;
}

export class GiftController {
  constructor(private giftService: GiftService) {}

  addGift = async (req: express.Request, res: express.Response) => {
    const today = new Date();
    try {
      const id = getRandomSixDigitNumber();
      const detail = req.body.giftDetail;
      const giftName = req.body.giftName;
      const image = req.body.image;
      const point = req.body.exchangePoint;
      const projectId = req.body.project;
      const dateAdd = today;

      const result = await this.giftService.addGift(
        id,
        giftName,
        detail,
        image,
        point,
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

  getAllGifts = async (req: express.Request, res: express.Response) => {
    const result = await this.giftService.getAllGifts();
    res.status(200).json(result);
  };

  deleteGift = async (req: express.Request, res: express.Response) => {
    try {
      const giftId = req.body.giftId;
      await this.giftService.deleteGift(giftId);
      return res.json({ success: true });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };
}
