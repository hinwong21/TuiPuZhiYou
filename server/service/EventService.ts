import { Knex } from "knex";

export class EventService {
  constructor(private knex: Knex) {}

  addEvent = async (
    id: string,
    image: string,
    participant: number | string,
    detail: string,
    projectId: string,
    dateAdd: Date
  ) => {
    try {
      await this.knex("events").insert({
        event_id: id,
        event_detail: detail,
        event_image: image,
        participant: participant,
        project_id: projectId,
        date_add: dateAdd,
      });
      return true;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  getAllEvents = async () => {
    try {
      const result = await this.knex("events").select("*");
      return result;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  deleteEvent = async (eventId: string) => {
    await this.knex("events").where("event_id", eventId).update({
      isDeleted: true,
    });
    return true;
  };
}
