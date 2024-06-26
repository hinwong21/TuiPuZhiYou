import express from "express";
import { knex } from "../db";
import { EventController } from "../controller/EventController";
import { EventService } from "../service/EventService";

export let eventRoutes = express.Router();

export let eventService = new EventService(knex);
let eventController = new EventController(eventService);

eventRoutes.post("/", eventController.getAllEvents);
eventRoutes.post("/add", eventController.addEvent);
eventRoutes.post("/delete", eventController.deleteEvent);
eventRoutes.post("/participant", eventController.checkEventFullAndJoined);
