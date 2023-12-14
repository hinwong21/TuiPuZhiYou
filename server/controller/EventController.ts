import express from "express";
import { errorHandler } from "../error";
import { EventService } from "../service/EventService";

function getRandomSixDigitNumber() {
  const dateNow = new Date();
  const timestamp = dateNow.getTime().toString();
  const randomSixDigits = timestamp.substr(timestamp.length - 6).toString();
  return randomSixDigits;
}

export class EventController {
  constructor(private eventService: EventService) {}

  addEvent = async (req: express.Request, res: express.Response) => {
    const today = new Date();
    try {
      const id = getRandomSixDigitNumber();
      const image = req.body.image;
      const participant = req.body.participant;
      const detail = req.body.detail;
      const projectId = "P001";
      const dateAdd = today;

      const result = await this.eventService.addEvent(
        id,
        image,
        participant,
        detail,
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

  getAllEvents = async (req: express.Request, res: express.Response) => {
    const result = await this.eventService.getAllEvents();
    res.status(200).json(result);
  };
}
