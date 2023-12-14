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
      const image = req.body.image;
      const point = req.body.exchangePoint;
      const projectId = "P001";
      const dateAdd = today;

      const result = await this.giftService.addGift(
        id,
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
}
