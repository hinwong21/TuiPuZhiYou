import express from "express";
import { errorHandler } from "../error";
import { EventService } from "../service/EventService";

export class EventController {
  constructor(private eventService: EventService) {}

  eventDetails = async (req: express.Request, res: express.Response) => {};
}
