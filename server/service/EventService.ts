import { Knex } from "knex";

export class EventService {
  constructor(private knex: Knex) {}

  addEvent = async (
    id: string,
    name: string,
    image: string,
    participant: number | string,
    detail: string,
    projectId: string,
    dateAdd: Date
  ) => {
    try {
      await this.knex("events").insert({
        event_id: id,
        event_name:name,
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
    try {
      await this.knex("events").where("event_id", eventId).update({
        isDeleted: true,
      });
      return true;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  checkEventFullAndJoined = async (eventId: string, userId: string) => {
    try {
      // Check if the event is full
      const event = await this.knex("events")
        .where("event_id", eventId)
        .first();

      if (!event) {
        throw new Error("Event not found");
      }

      const maxParticipants = event.participant;
      const participantCount = await this.knex("joinedEventRecords")
        .where("event_id", eventId)
        .count("user_id as count")
        .first();

      const currentParticipants = participantCount?.count || 0;

      if (currentParticipants >= maxParticipants) {
        return { full: true };
      }

      // Check if the user has already joined the event
      const isJoined = await this.knex("joinedEventRecords")
        .where({
          event_id: eventId,
          user_id: userId,
        })
        .first();

      return { full: false, joined: !!isJoined };
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };
}
