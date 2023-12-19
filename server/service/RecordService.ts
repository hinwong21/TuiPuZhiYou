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
    id: string,
    userId: string,
    giftId: string,
    exchangePoint: number,
    projectId: string,
    dateAdd: Date
  ) => {
    try {
      const exGiftID = await this.knex("exchangeGiftRecords")
        .insert({
          exchangeGiftRecords_id: id,
          user_id: userId,
          gift_id: giftId,
          project_id: projectId,
          apply_date: dateAdd,
        })
        .returning("exchangeGiftRecords_id");

      const totalPoint = await this.knex("userRecords")
        .where("user_id", userId)
        .update({
          total_point: this.knex.raw(`total_point - ${exchangePoint}`),
        })
        .returning("total_point");
      return {
        exGiftID: exGiftID[0].exchangeGiftRecords_id,
        point: totalPoint[0].total_point,
      };
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

  // user
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

  // user
  getAllJoinedEventRecords = async (userId: string) => {
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

  getAllProjectUserDetail = async (project: string, start: Date, end: Date) => {
    try {
      if (project === "全部") {
        const records = await this.knex("users")
          .select(
            "users.*",
            "userRecords.total_point",
            "userRecords.total_weight",
            "thisSelectedDateRangeWeight.selectedWeight"
          )
          .leftJoin("userRecords", "users.user_id", "userRecords.user_id")
          .leftJoin(
            this.knex("earnPointRecords")
              .select("user_id")
              .sum("weight as selectedWeight")
              .whereBetween("date_add", [start, end])
              .groupBy("user_id")
              .as("thisSelectedDateRangeWeight"),
            "users.user_id",
            "thisSelectedDateRangeWeight.user_id"
          );
        return records;
      } else {
        const records = await this.knex("users")
          .select(
            "users.*",
            "userRecords.total_point",
            "userRecords.total_weight",
            "thisSelectedDateRangeWeight.selectedWeight"
          )
          .leftJoin("userRecords", "users.user_id", "userRecords.user_id")
          .leftJoin(
            this.knex("earnPointRecords")
              .select("user_id")
              .sum("weight as selectedWeight")
              .whereBetween("date_add", [start, end])
              .groupBy("user_id")
              .as("thisSelectedDateRangeWeight"),
            "users.user_id",
            "thisSelectedDateRangeWeight.user_id"
          )
          .where("users.project_id", "=", project);
        return records;
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  getAllProjectExchangeGiftDetails = async (project: string) => {
    try {
      if (project === "全部") {
        const records = await this.knex("exchangeGiftRecords")
          .select("exchangeGiftRecords.*", "gifts.*", "users.*")
          .join("gifts", "exchangeGiftRecords.gift_id", "=", "gifts.gift_id")
          .join("users", "exchangeGiftRecords.user_id", "=", "users.user_id");
        return records;
      } else {
        const records = await this.knex("exchangeGiftRecords")
          .select("exchangeGiftRecords.*", "gifts.*", "users.*")
          .join("gifts", "exchangeGiftRecords.gift_id", "=", "gifts.gift_id")
          .join("users", "exchangeGiftRecords.user_id", "=", "users.user_id")
          .where("exchangeGiftRecords.project_id", project);

        return records;
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  getAllProjectJoinedEventDetails = async (project: string) => {
    try {
      if (project === "全部") {
        const records = await this.knex("events")
          .select("events.*", "joinedEventRecords.participantJoined")
          .leftJoin(
            this.knex("joinedEventRecords")
              .select("event_id")
              .count("user_id as participantJoined")
              .groupBy("event_id")
              .as("joinedEventRecords"),
            "events.event_id",
            "joinedEventRecords.event_id"
          );
        return records;
      } else {
        const records = await this.knex("events")
          .select("events.*", "joinedEventRecords.participantJoined")
          .where("events.project_id", project)
          .leftJoin(
            this.knex("joinedEventRecords")
              .select("event_id")
              .count("user_id as participantJoined")
              .groupBy("event_id")
              .as("joinedEventRecords"),
            "events.event_id",
            "joinedEventRecords.event_id"
          );
        return records;
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  getGiftExchangeRecordByGiftId = async (id: string) => {
    try {
      const records = await this.knex("exchangeGiftRecords")
        .select("exchangeGiftRecords.*", "users.*", "gifts.*")
        .join("users", "exchangeGiftRecords.user_id", "=", "users.user_id")
        .join("gifts", "exchangeGiftRecords.gift_id", "=", "gifts.gift_id")
        .where("exchangeGiftRecords.exchangeGiftRecords_id", id);
      return records;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  setGiftIsExchanged = async (id: string) => {
    const today = new Date();
    try {
      const result = await this.knex("exchangeGiftRecords")
        .where("exchangeGiftRecords_id", id)
        .update({ exchange_date: today })
        .update({ isExchanged: true })
        .returning("exchange_date");

      return result;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };
}
