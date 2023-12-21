import express from "express";
import { errorHandler } from "../error";
import { EventService } from "../service/EventService";
import { getRandomSixDigitNumber } from "../useFetch/getRandomNumber";

export class EventController {
  constructor(private eventService: EventService) {}

  addEvent = async (req: express.Request, res: express.Response) => {
    const today = new Date();
    try {
      const id = getRandomSixDigitNumber();
      const name = req.body.name;
      const image = req.body.image;
      const participant = req.body.participant;
      const detail = req.body.detail;
      const projectId = req.body.project;
      const dateAdd = today;

      const result = await this.eventService.addEvent(
        id,
        name,
        image,
        detail,
        participant,
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

  deleteEvent = async (req: express.Request, res: express.Response) => {
    try {
      const eventId = req.body.eventId;
      await this.eventService.deleteEvent(eventId);
      return res.json({ success: true });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  checkEventFullAndJoined = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const eventId = req.body.eventId;
      const userId = req.body.userId;
      const result = await this.eventService.checkEventFullAndJoined(
        eventId,
        userId
      );
      return res.json({ result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };
}
