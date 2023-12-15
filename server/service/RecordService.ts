import { Knex } from "knex";

export class RecordService {
  constructor(private knex: Knex) {}

  addPointRecord = async (
    userId: string,
    point: number,
    weight: number,
    projectId: string,
    dateAdd: Date
  ) => {
    try {
      await this.knex("earnPointRecords").insert({
        user_id: userId,
        earn_point: point,
        weight: weight,
        project_id: projectId,
        date_add: dateAdd,
      });

      await this.knex("userRecords")
        .where("user_id", userId)
        .update({
          total_point: this.knex.raw(`total_point + ${point}`),
          total_weight: this.knex.raw(`total_weight + ${weight}`),
        });
      return true;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  getWasteRecord = async (userId: string) => {
    try {
      const result = await this.knex("earnPointRecords")
        .select("*")
        .where("user_id", userId);
      return result;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  exchangeGiftRecord = async (
    userId: string,
    giftId: string,
    exchangePoint: number,
    projectId: string,
    dateAdd: Date
  ) => {
    try {
      await this.knex("exchangeGiftRecords").insert({
        user_id: userId,
        gift_id: giftId,
        project_id: projectId,
        apply_date: dateAdd,
      });

      const result = await this.knex("userRecords")
        .where("user_id", userId)
        .update({
          total_point: this.knex.raw(`total_point - ${exchangePoint}`),
        })
        .returning("total_point");
      return result[0].total_point;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  joinEventRecord = async (
    userId: string,
    eventId: string,
    projectId: string,
    dateAdd: Date
  ) => {
    await this.knex("joinedEventRecords").insert({
      user_id: userId,
      event_id: eventId,
      project_id: projectId,
      apply_date: dateAdd,
    });
    return true;
  };

  getAllExchangeGiftRecord = async (userId: string) => {
    try {
      const records = await this.knex("exchangeGiftRecords")
        .select("exchangeGiftRecords.*", "gifts.*")
        .join("gifts", "exchangeGiftRecords.gift_id", "=", "gifts.gift_id")
        .where("exchangeGiftRecords.user_id", userId);

      return records;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  getAllJoinedEventRecord = async (userId: string) => {
    try {
      const records = await this.knex("joinedEventRecords")
        .select("joinedEventRecords.*", "events.*")
        .join("events", "joinedEventRecords.event_id", "=", "events.event_id")
        .where("joinedEventRecords.user_id", userId);
      return records;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };
}
